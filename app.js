const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb+srv://cycbackend:3dTrKsbFlFApKaCC@meterreading-0zydj.gcp.mongodb.net/mreader?retryWrites=true&w=majority'
var bodyParser = require('body-parser')
var cors = require('cors')



const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology: true})

const con = mongoose.connection

con.on('open', function() {
    console.log('connected');
})

con.on('error', function() {
    console.log('unable connected');
})

const meterRouter = require('./routers/meterdata')
app.use('/data', meterRouter)

app.listen(9000, function() {
    console.log('Server Connected');
})