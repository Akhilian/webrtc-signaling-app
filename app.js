const express = require('express')
let app = express()
const port = 5000

const routes = require('./application/routes')

app = routes(app)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))