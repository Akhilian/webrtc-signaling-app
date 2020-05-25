const VisioEvent = require('./VisioEvent')

class NewUserAnswerEvent extends VisioEvent {
    constructor(from, to, answer) {
        super('SOMEONE_IS_ANSWERING')
        this.from = from;
        this.to = to;
        this.answer = answer;
    }
}

module.exports = NewUserAnswerEvent