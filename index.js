const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectionDB = require('./database/config')

const port = process.env.PORT || 4000

const app = express()

connectionDB()

app.use(cors())

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))

app.use('/api/events', require('./routes/calendar'))

app.listen( port , () => {
    console.log(`server on port ${port}`)
})