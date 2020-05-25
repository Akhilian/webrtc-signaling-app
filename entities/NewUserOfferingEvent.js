const VisioEvent = require('./VisioEvent')

class NewUserOfferingEvent extends VisioEvent {
    constructor(from, offer) {
        super('SOMEONE_IS_JOINING_THE_STREAM')
        this.from = from;
        this.offer = offer;
    }
}

module.exports = NewUserOfferingEvent