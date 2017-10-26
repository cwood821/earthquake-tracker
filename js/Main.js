import QuakeCollectionSingleton from "./QuakeCollectionSingleton";
import CardList from "./Components/CardList";
import events from "./Events";
import Utils from "./Utils";

const quakeCollection = QuakeCollectionSingleton.getInstance();
const cardList = new CardList(".card-holder");
// Icon to bind show / hide sidebar functionality to
const iconToggle = document.querySelector(".icon-holder");
iconToggle.addEventListener("click", Utils.toggleSidebar);

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
events.on("map-loaded", () => {
  quakeCollection.fetchQuakes();
});
// When quakes are fetched, show the application
events.on("quakes-fetched", startApplication);
// Re-render the cardList to show quakes in map boundaries
events.on("map-moved", cardList.render.bind(cardList));
