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
  return dateTime.getDay() == new Date().getDay()
    ? "Today"
    : `${dateTime.getMonth() + 1}/${dateTime.getDate()}`;
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
  if (
    isBetween(objLng, mapLeftLng, mapRightLng) &&
    isBetween(objLat, mapBottomLat, mapTopLat)
  ) {
    return true;
  }
  return false;
}

export default {
  formatTime,
  inBounds,
  toggleSidebar
};
