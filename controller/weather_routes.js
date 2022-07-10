const express = require('express')
const fetch = require('node-fetch')
//let weatherData
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
router.post('/', (req, res) => {
    // get the zipcode from the req.body and embed it in the API request URL
    const zip = req.body.zipcode
    const APIrequestUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=fcacd7488c5d8bb24fdc556ef3eb2d7f`
    
    //send the fetch request to the weather API
   fetch(APIrequestUrl)
    .then(res => res.json())
    .then(weatherData => {
        // check to make sure we received good data, otherwise manipulating no data will break the server
        if (weatherData.cod === 200) {
            weatherData.main.temp_min = Math.floor(weatherData.main.temp_min)
            weatherData.main.temp_max = Math.floor(weatherData.main.temp_max)
            weatherData.main.temp = Math.floor(weatherData.main.temp)
            weatherData.main.feels_like = Math.floor(weatherData.main.feels_like)
            weatherData.main.humidity = Math.floor(weatherData.main.humidity)
            weatherData.main.pressure = Math.floor(weatherData.main.pressure)
            //then render the show page with the correct weather iformation
            console.log(weatherData.weather[0].main)
            console.log(weatherData.weather[0].description)
            res.render('show', {weatherData})
            } else {
            //otherwise display the error with a link to get back to the main page
            res.send('please use a valid zipcode and try again <a href="/weather">click here to try again</a>')
            }  
    })
    .catch(err => console.log(err))    
})

module.exports = router
//code graveyard - experimented with a different fetch method
// const response = await fetch(APIrequestUrl) 
// weatherData = await response.json()