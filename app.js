const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

let app = express()
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 5000

const routes = require('./routes')
const EventBus = require('./services/EventBus')

const eventBus = new EventBus()

app.use(function (req, res, next) {
    res.eventBus = eventBus

    next()
})

app = routes(app)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))