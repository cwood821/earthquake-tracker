import Events from "./Events";
import map from "./Components/Map";
import utils from "./Utils";

export default class QuakeCollection {
  constructor() {
    this.quakes = [];
    this.apiURL = "https://earthquake.usgs.gov/fdsnws/event/1/query";

    // ?format=geojson&starttime=2017-10-23&endtime=2017-10-24"
  }

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
    // timestamp to force non-caching
    let timestamp = new Date();

    fetch(
      this.apiURL +
        `?format=${format}&starttime=${startTime}&endtime=${endtime}`
    ) // Call the fetch function passing the url of the API as a parameter
      .then(resp => resp.json())
      .then(quakes => {
        this.quakes = quakes.features;
        Events.emit("quakes-fetched", quakes);
      });
  }

  getAll() {
    return this.quakes;
  }

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

  getVisibleByIndex(index) {
    return this.getAllVisible()[index];
  }
}
