import secrets from "./Secrets";
import events from "./Events";

// Set Mabbox access token
mapboxgl.accessToken = secrets.mapboxToken;

const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v9', //stylesheet location
    center: [-74.50, 40], // starting position
    zoom: 3 // starting zoom
});

map.on('load', setUpMap);

function setUpMap() {
  map.addSource('quakeMarkers', {
      "type": "geojson",
      "data": {
          "type": "FeatureCollection",
          "features": []
      }
  });
  map.addLayer({
      "id": "the-quakeMarkers",
      "source": "quakeMarkers",
      "type": "circle",
      "paint": {
          // "circle-radius": 6,
          "circle-radius":    {
            "property": "mag",
            "type": "exponential",
            "stops": [
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
  events.emit("map-loaded");
};

// 1000 * Math.pow(2.5, quake.properties.mag)

map.on("mousemove", handleMapHover);
map.on("click", handleMapClick);
map.on("moveend", handleMapMove);

function handleMapHover(e) {
  // Ensure layer is present on map, in case loading is delayed
  if (! map.getLayer("the-quakeMarkers")) {
    return;
  }
  let features = map.queryRenderedFeatures(e.point, {layers: ["the-quakeMarkers"]});
  // Change the cursor style as a UI indicator.
  if (features.length > 0) {
    map.getCanvas().style.cursor ='pointer';
    showPopup(features[0]);
  } else {
    map.getCanvas().style.cursor = '';
  }
}

function handleMapClick (e) {
  // Ensure layer is present on map, in case loading is delayed
  if (! map.getLayer("the-quakeMarkers")) {
    return;
  }
  let features = map.queryRenderedFeatures(e.point, {layers: ["the-quakeMarkers"]});
  // Change the cursor style as a UI indicator.
  features.length > 0 && flyTo(features[0]);
}

function handleMapMove(e) {
  events.emit("map-moved", map);
}

// Map event subscriptions
events.on("quakes-fetched", setQuakes);
events.on("list-item-clicked", flyTo);
events.on("list-item-hovered", showPopup);


function setQuakes(quakes) {
  if (map.loaded()) {
    map.getSource('quakeMarkers').setData(quakes);
  }
}

events.on("quakes-fetched", setQuakes);

function flyTo(quake) {
  map.flyTo({
        center: [quake.geometry.coordinates[0], quake.geometry.coordinates[1]],
        zoom: 11
    });
}

let popup = new mapboxgl.Popup();

function showPopup(quake) {
    if (! quake) { // if no data passed, bail
      return;
    }
    popup.remove();
    popup = new mapboxgl.Popup({closeOnClick: false})
        .setLngLat([quake.geometry.coordinates[0], quake.geometry.coordinates[1]])
        .setHTML(
          `<h1>${quake.properties.mag}</h1>
            <p><a href="${quake.properties.url}" target="_blank">More information</a>`)
        .addTo(map);
}

export default map;
