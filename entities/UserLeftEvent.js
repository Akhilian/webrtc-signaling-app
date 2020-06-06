const VisioEvent = require('./VisioEvent')

class UserLeftEvent extends VisioEvent {
    constructor(user) {
        super('SOMEONE_LEFT')
        this.user = user;
    }
}

module.exports = UserLeftEvent