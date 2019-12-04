const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d617348511b79ed8d65f4d3a96db8a12/' + encodeURIComponent(latitude + ',' + longitude) + '?units=si'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined,
                body.daily.data[0].summary
                + ' It is currently '
                + body.currently.temperature
                + ' degrees out. There is a '
                + body.currently.precipProbability
                + '% chance of rain.'
                + 'The high today is '
                + body.daily.data[0].temperatureHigh
                + ' and the low is '
                + body.daily.data[0].temperatureLow
                + '.'
            )
        }
    })

}

module.exports = forecast