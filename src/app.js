const path = require('path');
const express = require('express');
const hbs = require('hbs')
const app = express();

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
        name: 'Damian Win'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Damian Win'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Damian Gwynne',
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
            // console.log(location + "HEYY")
            forecast(latitude, longitude, (c, d) => {
                if (c) {
                    res.send({c})
                } else {
                    console.log(d)
                    res.send({
                        location,
                        forecast: d
                    })
                }
            })
        }
    });

    // res.send({
    //     adress: req.query.adress
    // })

})

app.get('/404', (req,res) => {
    res.render('404',{
        title: 'Error',
        name: 'Damian Win',
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
        name: 'Damian Win',
        message: 'Help Article not found'        
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: 'Error',
        name: 'Damian Win',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})