import QuakeCollection from "./QuakeCollection";

// Holder for the singleton in this scope
let singleton = undefined;

export default class QuakeCollectionSingleton {

  static getInstance() {
    if (singleton) {
      return singleton;
    } else {
      singleton = new QuakeCollection();
      return singleton;
    }
  }

}
