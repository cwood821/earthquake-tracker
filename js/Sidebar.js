import QuakeCollectionSingleton from "./QuakeCollectionSingleton";
import events from "./Events";
import utils from "./Utils";

export default class Sidebar {

  constructor(selector) {
    this.element = document.querySelector(selector);

    this.element.addEventListener("click", this.handleClick.bind(this));
    this.element.addEventListener("mouseover", this.handleHover.bind(this));

  }

  handleClick(e) {
    let el = this.getCardFromEvent(e);
    events.emit("list-item-clicked",
      QuakeCollectionSingleton.getInstance().getVisibleByIndex(el.dataset.quakeId)
    );
  }

  handleHover(e) {
      let el = this.getCardFromEvent(e);
      if (! el) {
        return;
      }
      events.emit("list-item-hovered",
        QuakeCollectionSingleton.getInstance().getVisibleByIndex(el.dataset.quakeId)
      );
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
    this.element.innerHTML = QuakeCollectionSingleton.getInstance().getAllVisible()
      .reduce( (acc, quake, index) => {
        return acc + `<div class="card" data-quake-id=${index}>
          <div class="magnitude">
            ${quake.properties.mag}
          </div>
          <div class="description">
            ${quake.properties.place}
          </div>
           <div class="time">
            ${utils.formatTime(quake.properties.time)}
          </div>
        </div>`}, "");
    }
}
