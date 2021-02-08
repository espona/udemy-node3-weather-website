const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const pub_dir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup public directory
app.use(express.static(pub_dir))

app.get('',(req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Lucia"
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Lucia"
    })
})

const getWeather = (city, callback) => {
    geocode(city, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            console.error('Error', error)
            callback({error: error}, undefined)
        } else {

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    console.error('Error', error)
                    callback({error: error}, undefined)
                } else {
                    console.log('Location: ', location)
                    console.log('Forecast: ', forecastData)
                    callback(undefined, {location: location, forecast: forecastData})
                }
            })
        }
    })
}

app.get('/weather', (req, res) => {
    console.log(req.query);
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error: error})
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error: error})
            }
            res.send({forecast: forecastData,
                location: location,
                address: req.query.address
            })      
        })
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: "This is some help",
        name: "Lucia"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Error",
        errorMessage: "Help not found",
        name: "Lucia"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Error",
        errorMessage: "Not found. My 404.",
        name: "Lucia"
    })
})

app.listen(port, () => {
    console.log('Server is on on port ', port)
})
