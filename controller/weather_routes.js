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
//Main page route
router.get('/', (req, res) => {
    res.render('index')
})

//POST route - return with zipcode from the user
router.post('/', async (req, res) => {
    // get the zipcode from the req.body and embed it in the API request URL
    const zip = req.body.zipcode
    const APIrequestUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=fcacd7488c5d8bb24fdc556ef3eb2d7f`
    
    //send the fetch request to the weather API
    const response = await fetch(APIrequestUrl) 
    weatherData = await response.json()
    // check to make sure we received good data, otherwise manipulating no data will break the server
    if (weatherData.cod === 200) {
        weatherData.main.temp_min = Math.floor(weatherData.main.temp_min)
        weatherData.main.temp_max = Math.floor(weatherData.main.temp_max)
        weatherData.main.temp = Math.floor(weatherData.main.temp)
        weatherData.main.feels_like = Math.floor(weatherData.main.feels_like)
        weatherData.main.humidity = Math.floor(weatherData.main.humidity)
        weatherData.main.pressure = Math.floor(weatherData.main.pressure)
        //then render the show page with the correct weather iformation
        res.render('show', {weatherData})
    } else {
        //otherwise display the error with a link to get back to the main page
        res.send('please use a valid zipcode and try again <a href="/weather">click here to try again</a>')
    }  
})

module.exports = router