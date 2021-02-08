
const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibHVhbHVhIiwiYSI6ImNra21wNXp1cjJ0NnUyd3F0M3g1ZWI2OWgifQ.dAJq48_TzDjWeDwtnshM-g'
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback("Unable to connect to maps service!", undefined)
        } else if (body.features.length == 0){
            callback("Unable to find location. Try another search. " + body, undefined)
        } else {
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            const place_name = body.features[0].place_name
            callback(undefined, { latitude: latitude, 
                                  longitude: longitude,
                                  location: place_name} )
        }
    }) 

}

module.exports = geocode