const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=52b2b3ce985b96cdc5a84e7365a7e50e&query=' + longitude +  ',' + latitude

    request({url, json: true}, (error, {body}) => {

        if (error){
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error){
            callback("Unable to find location! " + body.error.info, undefined)
        } else {
            const temperature = body.current.temperature;
            const rain = body.current.precip;
            callback(undefined, "It is currently " + temperature + " degrees out, chance of rain is " + rain + "%") 
        }
    }) 
}

module.exports = forecast