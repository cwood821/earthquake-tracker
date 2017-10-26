var earthquakeTracker =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** The events object is a basic implementation
    of the publish and subscribe pattern. */
const Events = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function (eventName, fn) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i += 1) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(fn => fn(data));
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Events);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
* Return formatted date based on a given timestamp.
* @param {Timestamp} timestamp A number to check against minimum and maximum
* @returns {String}  A string formatted in either plain language or Month/Date
*/
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const icon = document.querySelector(".icon-holder");
  if (sidebar.classList.contains("sidebar-hide")) {
    icon.innerHTML = `<i class="fa fa-list" aria-hidden="true"></i>`;
  } else {
    icon.innerHTML = `<i class="fa fa-map-o" aria-hidden="true"></i>`;
  }
  sidebar.classList.toggle("sidebar-hide");
}

/**
* Return formatted date based on a given timestamp.
* @param {Timestamp} timestamp A number to check against minimum and maximum
* @returns {String}  A string formatted in either plain language or Month/Date
*/
function formatTime(timestamp) {
  const dateTime = new Date(timestamp);
  return dateTime.getDay() == new Date().getDay() ? "Today" : `${dateTime.getMonth() + 1}/${dateTime.getDate()}`;
}

/**
* Determine if a given value is between minimum and maximum value, exclusive
* @param {Number} value A number to check against minimum and maximum
* @param {Number} minimum The lower bounding number
* @param {GeoJSON} maximum The upper bounding number
* @returns {Boolean} True if the given value is between the bounds
*/
function isBetween(value, minimum, maximum) {
  return value < maximum && value > minimum;
}

/**
* Determine if a given GeoJSON feature is in the bounding box of
* the bounding box created by passed NE and SW coordinates
* @param {Array} neCoords An array representing Northeast point of box
* @param {Array} swCoords An array representing Soutwest point of box
* @param {GeoJSON} obj A GeoJSON feature
* @returns {Boolean} True if the obj is within bounds
*/
function inBounds(neCoords, swCoords, obj) {
  // Nice pointers to map boundaries
  const mapTopLat = neCoords[1];
  const mapBottomLat = swCoords[1];
  const mapLeftLng = swCoords[0];
  const mapRightLng = neCoords[0];
  // Nice pointers to station coordinates
  const objLng = obj.geometry.coordinates[0];
  const objLat = obj.geometry.coordinates[1];
  // Check bounding longitude and latittude against object
  if (isBetween(objLng, mapLeftLng, mapRightLng) && isBetween(objLat, mapBottomLat, mapTopLat)) {
    return true;
  }
  return false;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  formatTime,
  inBounds,
  toggleSidebar
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QuakeCollection__ = __webpack_require__(4);


// Holder for the singleton in this scope
let singleton;

/** Class representing an interface for creating or retrieving instances
    of the QuakeCollection class. */
class QuakeCollectionSingleton {
  /**
  * Return an existing instance of QuakeCollection if on exists, else create one
  * @returns {Object} - An instance of the QuakeCollection class
  */
  static getInstance() {
    singleton = singleton ? singleton : new __WEBPACK_IMPORTED_MODULE_0__QuakeCollection__["a" /* default */]();
    return singleton;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = QuakeCollectionSingleton;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QuakeCollectionSingleton__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_CardList__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Events__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Utils__ = __webpack_require__(1);





const quakeCollection = __WEBPACK_IMPORTED_MODULE_0__QuakeCollectionSingleton__["a" /* default */].getInstance();
const cardList = new __WEBPACK_IMPORTED_MODULE_1__Components_CardList__["a" /* default */](".card-holder");
// Icon to bind show / hide sidebar functionality to
const iconToggle = document.querySelector(".icon-holder");
iconToggle.addEventListener("click", __WEBPACK_IMPORTED_MODULE_3__Utils__["a" /* default */].toggleSidebar);

/**
* Start the application by hiding the load overlay and rendering the UI
*/
function startApplication() {
  // Hide the loading overlay
  document.querySelector(".loading").style.top = "-200%";
  // Render the cardList
  cardList.render();
  return true;
}

// Listen for map to load, then fetch quakes
__WEBPACK_IMPORTED_MODULE_2__Events__["a" /* default */].on("map-loaded", () => {
  quakeCollection.fetchQuakes();
});
// When quakes are fetched, show the application
__WEBPACK_IMPORTED_MODULE_2__Events__["a" /* default */].on("quakes-fetched", startApplication);
// Re-render the cardList to show quakes in map boundaries
__WEBPACK_IMPORTED_MODULE_2__Events__["a" /* default */].on("map-moved", cardList.render.bind(cardList));

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Events__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_Map__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils__ = __webpack_require__(1);




/** Class representing a collection of earthquake data. */
class QuakeCollection {
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
    let startTime = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    let endtime = `${tomorrow.getFullYear()}-${tomorrow.getMonth() + 1}-${tomorrow.getDate()}`;

    fetch(this.apiURL + `?format=${format}&starttime=${startTime}&endtime=${endtime}`) // Call the fetch function passing the url of the API as a parameter
    .then(resp => resp.json()).then(quakes => {
      this.quakes = quakes.features;
      __WEBPACK_IMPORTED_MODULE_0__Events__["a" /* default */].emit("quakes-fetched", quakes);
    });
    return this.quakes;
  }

  /**
  * Return all earthquakes visible within the current map boundaries
  * @returns {Array} - GeoJSON features of visible earthquakes
  */
  getAllVisible() {
    let neCoords = __WEBPACK_IMPORTED_MODULE_1__Components_Map__["a" /* default */].getBounds().getNorthEast().toArray();
    let swCoords = __WEBPACK_IMPORTED_MODULE_1__Components_Map__["a" /* default */].getBounds().getSouthWest().toArray();
    return this.quakes.filter(quake => __WEBPACK_IMPORTED_MODULE_2__Utils__["a" /* default */].inBounds(neCoords, swCoords, quake));
  }

  /**
  * Fetch a specific earthquake from those visible on the map
  * @returns {GeoJSON} - The earthquake at the given index
  */
  getVisibleByIndex(index) {
    return this.getAllVisible()[index];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = QuakeCollection;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Secrets__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Events__ = __webpack_require__(0);



// Set Mabbox access token
mapboxgl.accessToken = __WEBPACK_IMPORTED_MODULE_0__Secrets__["a" /* default */].mapboxToken;

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
        stops: [[0, 2], [1, 4], [2, 6], [4, 8], [5, 10], [6, 12], [7, 12], [8, 14], [9, 16], [10, 18]]
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
  __WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].emit("map-loaded");
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
  __WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].emit("map-moved", map);
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

  popup = new mapboxgl.Popup({ closeOnClick: false }).setLngLat([quake.geometry.coordinates[0], quake.geometry.coordinates[1]]).setHTML(`<h1>${quake.properties.mag}</h1>
            <p>${quake.properties.place}</p>
            <p>Updated ${updatedDate}</p>
            <p><a href="${quake.properties.url}" target="_blank">More information</a>`).addTo(map);
}

// Inner-application event subscriptions
__WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].on("quakes-fetched", setQuakes);
__WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].on("list-item-clicked", flyTo);
__WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].on("list-item-hovered", showPopup);
__WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].on("quakes-fetched", setQuakes);

// Mapbox map-specific events
map.on("load", handleMapLoad);
map.on("mousemove", handleMapHover);
map.on("click", handleMapClick);
map.on("moveend", handleMapMove);

/* harmony default export */ __webpack_exports__["a"] = (map);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const secrets = {
  mapboxToken: "pk.eyJ1IjoiY3dvb2Q4MjEiLCJhIjoiY2oxanFxbjdqMDFvNTJxb2gwc2NlZ2pkaCJ9.sWvSP0X0HGPkK_BBESCrTw"
};

/* harmony default export */ __webpack_exports__["a"] = (secrets);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QuakeCollectionSingleton__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Events__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils__ = __webpack_require__(1);




/** Class representing a list of cards. */
class CardList {
  /**
  * Create a point.
  * @constructor
  * @param {String} selector - The CSS selector the DOM element that will hold the list of cards
  */
  constructor(selector) {
    this.element = document.querySelector(selector);

    this.element.addEventListener("click", CardList.handleClick.bind(this));
    this.element.addEventListener("mouseover", CardList.handleHover.bind(this));
  }

  /**
  * Handle the click of a card in the list. Uses event propogation.
  * @param {Event} e - The event that propogates through this.element
  * @returns {Object} - A reference to the element that was clicked
  */
  static handleClick(e) {
    const el = CardList.getCardFromEvent(e);
    __WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].emit("list-item-clicked", __WEBPACK_IMPORTED_MODULE_0__QuakeCollectionSingleton__["a" /* default */].getInstance().getVisibleByIndex(el.dataset.quakeId));
    return el;
  }

  /**
  * Handle user hover over a card in the list. Uses event propogation.
  * @param {Event} e - The event that propogates through this.element
  * @returns {Object} - A reference to the element that was hovered over
  */
  static handleHover(e) {
    const el = CardList.getCardFromEvent(e);
    // Sometimes hover is less precise, so make sure we have an element
    if (!el) return;
    __WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].emit("list-item-hovered", __WEBPACK_IMPORTED_MODULE_0__QuakeCollectionSingleton__["a" /* default */].getInstance().getVisibleByIndex(el.dataset.quakeId));
    return el;
  }

  /**
  * Determine which card was clicked based on captured event
  * @param {Event} e - The event captured by the root list element
  * @returns {Object} - A reference to the specific card element that was clicked
  */
  static getCardFromEvent(e) {
    // Case 1: User clicks on card element itself
    if (e.target.classList.contains("card")) {
      return e.target;
    }
    // Case 2: User clicks on a magnitude or time, etc, in card
    if (e.target.parentNode.classList.contains("card")) {
      return e.target.parentNode;
    }
    return undefined;
  }

  /**
  * Render the list of cards
  * @returns {String} - The innerHTML of the card list element
  */
  render() {
    const visibleQuakes = __WEBPACK_IMPORTED_MODULE_0__QuakeCollectionSingleton__["a" /* default */].getInstance().getAllVisible();
    this.element.innerHTML = visibleQuakes.reduce((acc, quake, index) => {
      return `${acc}<div class="card" data-quake-id=${index}>
          <div class="magnitude">
            ${quake.properties.mag}
          </div>
          <div class="description">
            ${quake.properties.place}
          </div>
           <div class="time">
            ${__WEBPACK_IMPORTED_MODULE_2__Utils__["a" /* default */].formatTime(quake.properties.time)}
          </div>
        </div>`;
    }, "");
    return this.element.innerHTML;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CardList;


/***/ })
/******/ ]);