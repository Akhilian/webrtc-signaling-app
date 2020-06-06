const VisioEvent = require('./VisioEvent')

class NewUserOfferingEvent extends VisioEvent {
    constructor(from, to, offer) {
        super('OFFER', from, to)
        this.offer = offer;
    }
}

module.exports = NewUserOfferingEvent