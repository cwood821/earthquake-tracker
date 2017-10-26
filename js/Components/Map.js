import secrets from "../Secrets";
import events from "../Events";

// Set Mabbox access token
mapboxgl.accessToken = secrets.mapboxToken;

const map = new mapboxgl.Map({
  container: "map", // container id
  style: "mapbox://styles/mapbox/dark-v9", // stylesheet location
  center: [-74.5, 40], // starting position
  zoom: 3 // starting zoom
});

/**
* Set up map layers used in the application
* @return {Boolean} True / False if layers were added
*/
function addMapLayers() {
  // Sources hold data that is rendered in a layer
  map.addSource("quakeMarkers", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: []
    }
  });
  map.addLayer({
    id: "the-quakeMarkers",
    source: "quakeMarkers",
    type: "circle",
    paint: {
      "circle-radius": {
        property: "mag",
        type: "exponential",
        stops: [
          [0, 2],
          [1, 4],
          [2, 6],
          [4, 8],
          [5, 10],
          [6, 12],
          [7, 12],
          [8, 14],
          [9, 16],
          [10, 18]
        ]
      },
      "circle-color": "#4817F6"
    }
  });
  return map.getLayer("the-quakeMarkers") && map.getSource("quakeMarkers");
}

/**
* Handle map load event
*/
function handleMapLoad() {
  addMapLayers();
  events.emit("map-loaded");
}

/**
* Handle when a user hovers over a map point
* @param {Event} e - The event dispatched by the map
* @return {Boolean} Whether an earthquake marker was hovered over
*/
function handleMapHover(e) {
  // Ensure layer is present on map, in case loading is delayed
  if (!map.getLayer("the-quakeMarkers")) return false;
  const features = map.queryRenderedFeatures(e.point, {
    layers: ["the-quakeMarkers"]
  });
  // Change the cursor style as a UI indicator.
  if (features.length > 0) {
    map.getCanvas().style.cursor = "pointer";
    showPopup(features[0]);
    return true;
  }
  // No feature was hoverd over, reset the point style
  map.getCanvas().style.cursor = "";
  return false;
}

/**
* Handle when a user clicks on the map
* @param {Event} e The event dispatched by the map
* @return {Boolean} Whether an earthquake marker was clicked
*/
function handleMapClick(e) {
  // Ensure layer is present on map, in case loading is delayed
  if (!map.getLayer("the-quakeMarkers")) return false;
  const features = map.queryRenderedFeatures(e.point, {
    layers: ["the-quakeMarkers"]
  });
  // Change the cursor style as a UI indicator.
  if (features.length > 0) {
    flyTo(features[0]);
    return true;
  }
  return false;
}

/**
* Handle when a user clicks on the map
* @param {Event} e The event dispatched by the map
*/
function handleMapMove(e) {
  events.emit("map-moved", map);
}

/**
* Add the Quake GeoJSON FeatureCollection to the map
* @param {GeoJSON} quakes The event dispatched by the map
* @returns {Object} The GeoJSON source from the map
*/
function setQuakes(quakes) {
  return map.getSource("quakeMarkers").setData(quakes);
}

/**
* Wrapper for the Mapbox Gl JS flyTo function
* @param {GeoJSON} quake The GeoJSON feature representing the map position to fly to
* @returns {Object} The map object
*/
function flyTo(quake) {
  return map.flyTo({
    center: [quake.geometry.coordinates[0], quake.geometry.coordinates[1]],
    zoom: 11
  });
}

let popup = new mapboxgl.Popup();

/**
* Adds a popup to the map
* @param {GeoJSON} quake The GeoJSON feature representing quake to fly to
* @returns {Object} The map object
*/
function showPopup(quake) {
  if (!quake) return; // if no data passed, bail
  popup.remove();

  let updatedDate = new Date(quake.properties.updated);

  popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat([quake.geometry.coordinates[0], quake.geometry.coordinates[1]])
    .setHTML(
      `<h1>${quake.properties.mag}</h1>
            <p>${quake.properties.place}</p>
            <p>Updated ${updatedDate}</p>
            <p><a href="${quake.properties
              .url}" target="_blank">More information</a>`
    )
    .addTo(map);
}

// Inner-application event subscriptions
events.on("quakes-fetched", setQuakes);
events.on("list-item-clicked", flyTo);
events.on("list-item-hovered", showPopup);
events.on("quakes-fetched", setQuakes);

// Mapbox map-specific events
map.on("load", handleMapLoad);
map.on("mousemove", handleMapHover);
map.on("click", handleMapClick);
map.on("moveend", handleMapMove);

export default map;
