/////////////////////////////////
// import dependencies
/////////////////////////////////
require('dotenv').config()
const express = require('express')
const weatherRoutes = require('./controller/weather_routes')
const fetch = require('node-fetch')

////////////////////////////////////////////
// Create our express application object
////////////////////////////////////////////
const app = require('liquid-express-views')(express())

////////////////////////////////////////////
// Middleware
////////////////////////////////////////////
// this is for request logging

// parses urlencoded request bodies
app.use(express.urlencoded({ extended: false }))
// to serve files from public statically
app.use(express.static('public'))

////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.use('/weather', weatherRoutes)

//localhost:3000/
app.get('/', (req, res) => {
	res.send(`<a href="/weather/">Let's look up some weather</a>`)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})