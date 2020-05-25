const NewUserOfferingEvent = require('./entities/NewUserOfferingEvent')
const NewUserAnswerEvent = require('./entities/NewUserAnswerEvent')

const EventEmitter = require('events');
const bridge = new EventEmitter();

const events = []
let clients = []

const { Observable } = require('rxjs');
const stream = new Observable(subscriber => {
    bridge.on('event', (data) => {
        subscriber.next(data)
    });
})

stream.subscribe({
    next: (event) => {
        console.log(event)
        clients.forEach(c => c.res.write(`data: ${JSON.stringify(event)}\n\n`))
    }
})

module.exports = (app) => {
    app.get('/status', (req, res) => {
        res.status(200).json()
        bridge.emit('event', { toto: new NewUserOfferingEvent() })
    })

    app.post('/signaling', (req, res) => {
        const { from, offer, answer } = req.body
        bridge.emit('event', req.body);

        //     const extracted = new NewUserOfferingEvent(from, offer);
            // if (offer) {
        //     bridge.emit('event', extracted);
        // }

        // if (answer) {
        //     const { to } = req.body;
        //     const extracted = new NewUserAnswerEvent(from, to, answer);
        //     bridge.emit('event', extracted);
        // }


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

        
        clients.push(newClient);
        
        req.on('close', () => {
            clients = clients.filter(c => c.id !== clientId);
        });
    })
    
    return app
}