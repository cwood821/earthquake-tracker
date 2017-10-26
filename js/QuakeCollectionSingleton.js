import QuakeCollection from "./QuakeCollection";

// Holder for the singleton in this scope
let singleton;

/** Class representing an interface for creating or retrieving instances
    of the QuakeCollection class. */
export default class QuakeCollectionSingleton {
  /**
  * Return an existing instance of QuakeCollection if on exists, else create one
  * @returns {Object} - An instance of the QuakeCollection class
  */
  static getInstance() {
    singleton = singleton ? singleton : new QuakeCollection();
    return singleton;
  }
}
