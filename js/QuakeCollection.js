import events from "./Events";
import map from "./Map";
import utils from "./Utils";

export default class QuakeCollection {

  constructor() {
    this.quakes = [];
    this.apiURL = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-10-23&endtime=2017-10-24"
  }

  fetchQuakes() {
    fetch(this.apiURL) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then( (quakes) => {
      this.quakes = quakes.features;
      events.emit("quakes-fetched", quakes);
    });
  }

  getAll() {
    return this.quakes;
  }

  getAllVisible()  {
    let neCoords = map.getBounds().getNorthEast().toArray();
    let swCoords = map.getBounds().getSouthWest().toArray();
    return this.quakes.filter(quake => utils.inBounds(neCoords, swCoords, quake));
  }

  getVisibleByIndex(index) {
    return this.getAllVisible()[index];
  }

}
