const request = require('request');


const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1IjoiZGFtaWFuZXJpYyIsImEiOiJjanRrbTViZ2IxMmlxM3lxd3hmNjE3cG5hIn0.qaXdQPp0zDJx3FXPR2fzuA&limit=1`;

    request({url, json: true}, (error, back) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (back.body.features.length === 0) {
            callback('Unable to connect to location services. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: back.body.features[0].center[1],
                longitude: back.body.features[0].center[0],
                location: back.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode;