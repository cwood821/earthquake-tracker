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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Events
// A minimal Javascript publish subscribe implementation

const events = {
  events: {},
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function (eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },
  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn(data);
      });
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (events);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QuakeCollection__ = __webpack_require__(5);


// Holder for the singleton in this scope
let singleton = undefined;

class QuakeCollectionSingleton {

  static getInstance() {
    if (singleton) {
      return singleton;
    } else {
      singleton = new __WEBPACK_IMPORTED_MODULE_0__QuakeCollection__["a" /* default */]();
      return singleton;
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = QuakeCollectionSingleton;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Secrets__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Events__ = __webpack_require__(0);



// Set Mabbox access token
mapboxgl.accessToken = __WEBPACK_IMPORTED_MODULE_0__Secrets__["a" /* default */].mapboxToken;

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
      "circle-radius": {
        "property": "mag",
        "type": "exponential",
        "stops": [[0, 2], [1, 4], [2, 6], [4, 8], [5, 10], [6, 12], [7, 12], [8, 14], [9, 16], [10, 18]]
      },
      "circle-color": "#4817F6"
    }
  });
  __WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].emit("map-loaded");
};

// 1000 * Math.pow(2.5, quake.properties.mag)

map.on("mousemove", handleMapHover);
map.on("click", handleMapClick);
map.on("moveend", handleMapMove);

function handleMapHover(e) {
  // Ensure layer is present on map, in case loading is delayed
  if (!map.getLayer("the-quakeMarkers")) {
    return;
  }
  let features = map.queryRenderedFeatures(e.point, { layers: ["the-quakeMarkers"] });
  // Change the cursor style as a UI indicator.
  if (features.length > 0) {
    map.getCanvas().style.cursor = 'pointer';
    showPopup(features[0]);
  } else {
    map.getCanvas().style.cursor = '';
  }
}

function handleMapClick(e) {
  // Ensure layer is present on map, in case loading is delayed
  if (!map.getLayer("the-quakeMarkers")) {
    return;
  }
  let features = map.queryRenderedFeatures(e.point, { layers: ["the-quakeMarkers"] });
  // Change the cursor style as a UI indicator.
  features.length > 0 && flyTo(features[0]);
}

function handleMapMove(e) {
  __WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].emit("map-moved", map);
}

// Map event subscriptions
__WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].on("quakes-fetched", setQuakes);
__WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].on("list-item-clicked", flyTo);
__WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].on("list-item-hovered", showPopup);

function setQuakes(quakes) {
  if (map.loaded()) {
    map.getSource('quakeMarkers').setData(quakes);
  }
}

__WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].on("quakes-fetched", setQuakes);

function flyTo(quake) {
  map.flyTo({
    center: [quake.geometry.coordinates[0], quake.geometry.coordinates[1]],
    zoom: 11
  });
}

let popup = new mapboxgl.Popup();

function showPopup(quake) {
  if (!quake) {
    // if no data passed, bail
    return;
  }
  popup.remove();
  popup = new mapboxgl.Popup({ closeOnClick: false }).setLngLat([quake.geometry.coordinates[0], quake.geometry.coordinates[1]]).setHTML(`<h1>${quake.properties.mag}</h1>
            <p><a href="${quake.properties.url}" target="_blank">More information</a>`).addTo(map);
}

/* harmony default export */ __webpack_exports__["a"] = (map);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// Icon to bind show / hide sidebar functionality to
const iconToggle = document.querySelector(".icon-holder");
iconToggle.addEventListener("click", toggleSidebar);

// Show / hide sidebar on mobile based on click of icon
function toggleSidebar() {
  let sidebar = document.querySelector(".sidebar");
  let sidebarLeft = sidebar.style.left;
  let iconHTML = document.querySelector(".icon-holder").innerHTML;

  if (sidebarLeft === "" || sidebarLeft === "200" || sidebarLeft === "0px") {
    sidebarLeft = "200%";
    iconHTML = '<i class="fa fa-list" aria-hidden="true"></i>';
  } else {
    sidebarLeft = "0";
    iconHTML = '<i class="fa fa-map-o" aria-hidden="true"></i>';
  }
}

// Return formatted date based on a given timestamp.
// If the timestamp is from today, it will return "Today", otherwise
// Month/Day format
function formatTime(timestamp) {
  const dateTime = new Date(timestamp);
  return dateTime.getDay() == new Date().getDay() ? "Today" : `${dateTime.getMonth() + 1}/${dateTime.getDate()}`;
}

function isBetween(value, minimum, maximum) {
  return value < maximum && value > minimum;
}

// Takes map northeast and southwest map boundaries
// as [lng, lat]. Third parameter is a GeoJSON feature
// for comparison
function inBounds(neCoords, swCoords, obj) {
  // Nice pointers to map boundaries
  var mapTopLat = neCoords[1];
  var mapBottomLat = swCoords[1];
  var mapLeftLng = swCoords[0];
  var mapRightLng = neCoords[0];
  // Nice pointers to station coordinates
  var objLng = obj.geometry.coordinates[0];
  var objLat = obj.geometry.coordinates[1];
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QuakeCollectionSingleton__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Sidebar__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Map__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Events__ = __webpack_require__(0);





const quakeCollection = __WEBPACK_IMPORTED_MODULE_0__QuakeCollectionSingleton__["a" /* default */].getInstance();
const sidebar = new __WEBPACK_IMPORTED_MODULE_1__Sidebar__["a" /* default */](".card-holder");

// listen for map to load, then fetch quakes
__WEBPACK_IMPORTED_MODULE_3__Events__["a" /* default */].on("map-loaded", () => {
  quakeCollection.fetchQuakes();
});

// When quakes are fetched, show the application
__WEBPACK_IMPORTED_MODULE_3__Events__["a" /* default */].on("quakes-fetched", quakes => {
  showApplication();
});

__WEBPACK_IMPORTED_MODULE_3__Events__["a" /* default */].on("map-moved", sidebar.render.bind(sidebar));

function showApplication() {
  // Hide the loading overlay
  document.querySelector(".loading").style.top = "-200%";
  // Render the sidebar
  sidebar.render();
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Events__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Map__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils__ = __webpack_require__(3);




class QuakeCollection {

  constructor() {
    this.quakes = [];
    this.apiURL = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-10-23&endtime=2017-10-24";
  }

  fetchQuakes() {
    fetch(this.apiURL) // Call the fetch function passing the url of the API as a parameter
    .then(resp => resp.json()).then(quakes => {
      this.quakes = quakes.features;
      __WEBPACK_IMPORTED_MODULE_0__Events__["a" /* default */].emit("quakes-fetched", quakes);
    });
  }

  getAll() {
    return this.quakes;
  }

  getAllVisible() {
    let neCoords = __WEBPACK_IMPORTED_MODULE_1__Map__["a" /* default */].getBounds().getNorthEast().toArray();
    let swCoords = __WEBPACK_IMPORTED_MODULE_1__Map__["a" /* default */].getBounds().getSouthWest().toArray();
    return this.quakes.filter(quake => __WEBPACK_IMPORTED_MODULE_2__Utils__["a" /* default */].inBounds(neCoords, swCoords, quake));
  }

  getVisibleByIndex(index) {
    return this.getAllVisible()[index];
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = QuakeCollection;


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__QuakeCollectionSingleton__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Events__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils__ = __webpack_require__(3);




class Sidebar {

  constructor(selector) {
    this.element = document.querySelector(selector);

    this.element.addEventListener("click", this.handleClick.bind(this));
    this.element.addEventListener("mouseover", this.handleHover.bind(this));
  }

  handleClick(e) {
    let el = this.getCardFromEvent(e);
    __WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].emit("list-item-clicked", __WEBPACK_IMPORTED_MODULE_0__QuakeCollectionSingleton__["a" /* default */].getInstance().getVisibleByIndex(el.dataset.quakeId));
  }

  handleHover(e) {
    let el = this.getCardFromEvent(e);
    if (!el) {
      return;
    }
    __WEBPACK_IMPORTED_MODULE_1__Events__["a" /* default */].emit("list-item-hovered", __WEBPACK_IMPORTED_MODULE_0__QuakeCollectionSingleton__["a" /* default */].getInstance().getVisibleByIndex(el.dataset.quakeId));
  }

  getCardFromEvent(e) {
    // Case 1: User clicks on card element itself
    if (e.target.classList.contains("card")) {
      return e.target;
    }
    // Case 2: User clicks on a magnitude or time, etc, in card
    if (e.target.parentNode.classList.contains("card")) {
      return e.target.parentNode;
    }
  }

  render() {
    this.element.innerHTML = __WEBPACK_IMPORTED_MODULE_0__QuakeCollectionSingleton__["a" /* default */].getInstance().getAllVisible().reduce((acc, quake, index) => {
      return acc + `<div class="card" data-quake-id=${index}>
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
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sidebar;


/***/ })
/******/ ]);