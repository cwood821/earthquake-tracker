import QuakeCollectionSingleton from './QuakeCollectionSingleton';
import Sidebar from './Sidebar';
import map from "./Map";
import events from "./Events";

const quakeCollection = QuakeCollectionSingleton.getInstance();
const sidebar = new Sidebar(".card-holder");

// listen for map to load, then fetch quakes
events.on("map-loaded", () => {
  quakeCollection.fetchQuakes();
});

// When quakes are fetched, show the application
events.on("quakes-fetched", (quakes) => {
  showApplication();
});

events.on("map-moved", sidebar.render.bind(sidebar));

function showApplication() {
  // Hide the loading overlay
  document.querySelector(".loading").style.top = "-200%";
  // Render the sidebar
  sidebar.render();
}
