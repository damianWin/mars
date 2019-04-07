const path = require('path');
const express = require('express');
const hbs = require('hbs')

const app = express();
const port = process.env.PORT || 3000

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../tempest/views');
const partialsPath = path.join(__dirname, '../tempest/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) 

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Eric Gwynne'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Eric Gwynne'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Eric Gwynne',
        message: 'If you have question, send us a mail to djbizquitz@gmail.com'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'You need to provide an adress'
        })
    }

    geocode(req.query.adress, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            res.send({error})
        } else {
            forecast(latitude, longitude, (c, d) => {
                if (c) {
                    res.send({c})
                } else {
                    console.log(d)
                    res.send({
                        // location
                        // ,
                        // forecast: d
                    })
                }
            })
        }
    });



})

app.get('/404', (req,res) => {
    res.render('404',{
        title: 'Error',
        name: 'Eric Gwynne',
        message: 'Something went wrong. No page found'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 'Error',
        name: 'Eric Gwynne',
        message: 'Help Article not found'        
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: 'Error',
        name: 'Eric Gwynne',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})