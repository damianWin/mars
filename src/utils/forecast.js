const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/38ad3b190aa0ca8650e9fd7573b51cc1/${latitude},${longitude}?units=si`;

    request({url, json: true}, (error, {body}) => {
        
    
        // console.log(`Latitude: ${data.latitude}`);
        // console.log(`Longitude: ${data.longitude}`);
        if (error) {
            callback(error.port, undefined)
        } else if (body.code === 400) {
            callback(undefined, "The given location (or time) is invalid.")
        } else {
            // const data = body.body;
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out there with a ${body.currently.humidity * 100}% humidity`)
        }
        
    })
}



module.exports = forecast