const VisioEvent = require('./VisioEvent')

class NewUserAnswerEvent extends VisioEvent {
    constructor(from, to, answer) {
        super('ANSWER', from, to)
        this.answer = answer;
    }
}

module.exports = NewUserAnswerEvent