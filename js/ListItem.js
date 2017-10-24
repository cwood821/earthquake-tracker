import events from "./Events";

class ListItem {

  constructor(quake) {
    this.quake = quake;
  }

  render() {
    return `<div class="card">
        <div class="magnitude">
          ${this.quake.getMagnitude()}
        </div>
        <div class="description">
          ${this.quake.getRelativeLocation()}
        </div>
         <div class="time">
          ${this.quake.getTime()}
        </div>
      </div>`;
  }

}
