const NewUserOfferingEvent = require('./entities/NewUserOfferingEvent')
const NewUserAnswerEvent = require('./entities/NewUserAnswerEvent')
const UserJoinedEvent = require('./entities/UserJoinedEvent')
const UserLeftEvent = require('./entities/UserLeftEvent')
const UpdatedListOfUserEvent = require('./entities/UpdatedListOfUserEvent')
const ICECandidateEvent = require('./entities/ICECandidateEvent')

const EventEmitter = require('events');
const bridge = new EventEmitter();

let clients = []

function print(clients) {
    console.log(clients.map((client) => {
        return {
            id: client.id
        }
    }))
}

const { Observable } = require('rxjs');
const stream = new Observable(subscriber => {
    bridge.on('event', (data) => {
        print(clients)
        subscriber.next(data)
    });
})

stream.subscribe({
    next: (event) => {
        if(event.to) {
            const sendTo = clients.find((client) => client.id === event.to)
            if(sendTo) {
                sendTo.res.write(`data: ${JSON.stringify(event)}\n\n`)
            }
        } else {
            clients.forEach(c => c.res.write(`data: ${JSON.stringify(event)}\n\n`))
        }
    }
})

module.exports = (app) => {
    app.get('/status', (req, res) => {
        res.status(200).json()
    })

    app.post('/signaling', (req, res) => {
        const { from, to, desc, candidate } = req.body

        if (candidate) {
            bridge.emit('event', new ICECandidateEvent(from, to, candidate));
        } else if (desc.type === 'offer') {
            bridge.emit('event', new NewUserOfferingEvent(from, to, desc));
        } else if (desc.type === 'answer') {
            bridge.emit('event', new NewUserAnswerEvent(from, to, desc));
        }

        res.status(200).json()
    })

    app.get('/stream', (req, res, next) => {
        const clientId = req.query.uuid
        const newClient = {
            id: clientId,
            res
        };
        
        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        };
        
        res.writeHead(200, headers);
        
        bridge.emit('event', new UserJoinedEvent({ id: clientId }));

        clients.push(newClient);

        const listOfClients = clients.reduce((acc, client) => {
            acc.push(client.id)
            return acc;
        }, [])

        bridge.emit('event', new UpdatedListOfUserEvent(listOfClients));
        
        req.on('close', () => {
            clients = clients.filter(c => c.id !== clientId);
            const listOfClients = clients.reduce((acc, client) => {
                acc.push(client.id)
                return acc;
            }, [])
            bridge.emit('event', new UpdatedListOfUserEvent(listOfClients));
        });
    })
    
    return app
}