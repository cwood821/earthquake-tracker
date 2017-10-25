/** The events object is a basic implementation
    of the publish and subscribe pattern. */
const Events = {
  events: {},
  on: function(eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },
  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i += 1) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  },
  emit: function(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(fn => fn(data));
    }
  }
};

export default Events;
