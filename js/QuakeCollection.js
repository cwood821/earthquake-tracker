import events from "./Events";
import map from "./Components/Map";
import utils from "./Utils";

/** Class representing a collection of earthquake data. */
export default class QuakeCollection {
  /**
  * Create a QuakeCollection.
  * @constructor
  */
  constructor() {
    this.quakes = [];
    this.apiURL = "https://earthquake.usgs.gov/fdsnws/event/1/query";
  }

  /**
  * Fetch earthquake data from the USGS API
  * @returns {Array} - An array of GeoJSON features representing earthquakes
  */
  fetchQuakes() {
    // Date placeholder
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    // Formatted parameters for API call
    let format = "geojson";
    let startTime = `${today.getFullYear()}-${today.getMonth() +
      1}-${today.getDate()}`;
    let endtime = `${tomorrow.getFullYear()}-${tomorrow.getMonth() +
      1}-${tomorrow.getDate()}`;

    fetch(
      this.apiURL +
        `?format=${format}&starttime=${startTime}&endtime=${endtime}`
    ) // Call the fetch function passing the url of the API as a parameter
      .then(resp => resp.json())
      .then(quakes => {
        this.quakes = quakes.features;
        events.emit("quakes-fetched", quakes);
      });
    return this.quakes;
  }

  /**
  * Return all earthquakes visible within the current map boundaries
  * @returns {Array} - GeoJSON features of visible earthquakes
  */
  getAllVisible() {
    let neCoords = map
      .getBounds()
      .getNorthEast()
      .toArray();
    let swCoords = map
      .getBounds()
      .getSouthWest()
      .toArray();
    return this.quakes.filter(quake =>
      utils.inBounds(neCoords, swCoords, quake)
    );
  }

  /**
  * Fetch a specific earthquake from those visible on the map
  * @returns {GeoJSON} - The earthquake at the given index
  */
  getVisibleByIndex(index) {
    return this.getAllVisible()[index];
  }
}
