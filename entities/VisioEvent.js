class VisioEvent {
    constructor(message, from, to) {
        this.dateEmitted = new Date()
        this.message = message
        this.from = from
        this.to = to
    }
}

module.exports = VisioEvent