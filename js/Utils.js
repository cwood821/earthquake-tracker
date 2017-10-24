
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
  return dateTime.getDay() == new Date().getDay() ?
    "Today" :
    `${dateTime.getMonth()+1}/${dateTime.getDate()}`;
}

function isBetween(value, minimum, maximum) {
  return (value < maximum &&  value > minimum);
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
  if ( isBetween(objLng, mapLeftLng, mapRightLng) && isBetween(objLat, mapBottomLat, mapTopLat) ) {
      return true;
  }
  return false;
}

export default {
  formatTime,
  inBounds,
  toggleSidebar
}
