const express = require('express')
const fetch = require('node-fetch')
const weatherAPI = 'api.openweathermap.org/data/2.5/weather?zip=94520,us&units=imperial&appid=fcacd7488c5d8bb24fdc556ef3eb2d7f'
let weatherData
////////////////////////////////////
// Creaet a router
////////////////////////////////////
const router = express.Router()

////////////////////////////////////
// List our routes
////////////////////////////////////
router.get('/', (req, res) => {
    res.render('index')
})

router.get(weatherAPI, (req, res) => {
    
})
router.post('/', async (req, res) => {
    // get the zipcode from the req.body and send the fetch request to the weather API
    const zip = req.body.zipcode
    //console.log(zip)
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=fcacd7488c5d8bb24fdc556ef3eb2d7f`
    
    

    const response = await fetch(weatherAPI) 
    weatherData = await response.json()
    //console.log('data', data)
    console.log('inside the function data', weatherData)
    res.render('show', {weatherData})
    

    // fetchWeather(zip)
    // console.log(weatherData)
    //then re render the page with the correct weather
    

    
})

// router.get('/show', (req, res) => {
//     res.render('show', {weatherData})

// })
module.exports = router