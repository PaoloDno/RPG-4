const EventBus = {
  events: {},

  on(event, handler) {
    (this.events[event] ||= []).push(handler);
  },

  emit(event, payload) {
    (this.events[event] || []).forEach(h => h(payload));
  },

  off(event, handler) {
    this.events[event] = (this.events[event] || []).filter(h => h !== handler);
  },

  clear() {
  this.events = {};
  },



  // New method to console active events
  logActiveEvents() {
    console.log("Active EventBus events:");
    for (const [event, handlers] of Object.entries(this.events)) {
      console.log(`Event: '${event}', Handlers: ${handlers.length}`);
      handlers.forEach((h, i) => console.log(`  [${i}] ${h.name || "anonymous function"}`));
    }
  }
};

export default EventBus;