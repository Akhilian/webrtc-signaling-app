const VisioEvent = require('./VisioEvent')

class UpdatedListOfUserEvent extends VisioEvent {
    constructor(listOfClients) {
        super('UPDATED_LIST_OF_USER')
        this.listOfClients = listOfClients;
    }
}

module.exports = UpdatedListOfUserEvent