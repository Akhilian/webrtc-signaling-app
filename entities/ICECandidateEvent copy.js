const VisioEvent = require('./VisioEvent')

class ICECandidateEvent extends VisioEvent {
    constructor(from, to, candidate) {
        super('SOMEONE_OFFERING_ICE_CANDIDATE', from, to)
        this.candidate = candidate;
    }
}

module.exports = ICECandidateEvent