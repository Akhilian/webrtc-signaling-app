class EventBus {
    constructor() {
        this.events = []
    }

    addEvent(event) {
        this.events.push(event)
    }
}

module.exports = EventBus