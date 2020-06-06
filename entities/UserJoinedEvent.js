const VisioEvent = require('./VisioEvent')

class UserJoinedEvent extends VisioEvent {
    constructor(user) {
        super('SOMEONE_JOINED', user.id)
        this.user = user;
    }
}

module.exports = UserJoinedEvent