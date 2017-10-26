import QuakeCollectionSingleton from "../QuakeCollectionSingleton";
import events from "../Events";
import utils from "../Utils";

/** Class representing a list of cards. */
export default class CardList {
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
    events.emit(
      "list-item-clicked",
      QuakeCollectionSingleton.getInstance().getVisibleByIndex(
        el.dataset.quakeId
      )
    );
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
    events.emit(
      "list-item-hovered",
      QuakeCollectionSingleton.getInstance().getVisibleByIndex(
        el.dataset.quakeId
      )
    );
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
    const visibleQuakes = QuakeCollectionSingleton.getInstance().getAllVisible();
    this.element.innerHTML = visibleQuakes.reduce((acc, quake, index) => {
      return `${acc}<div class="card" data-quake-id=${index}>
          <div class="magnitude">
            ${quake.properties.mag}
          </div>
          <div class="description">
            ${quake.properties.place}
          </div>
           <div class="time">
            ${utils.formatTime(quake.properties.time)}
          </div>
        </div>`;
    }, "");
    return this.element.innerHTML;
  }
}
