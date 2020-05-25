class VisioEvent {
    constructor(message) {
        this.dateEmitted = new Date()
        this.message = message
    }
}

module.exports = VisioEvent