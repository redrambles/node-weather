const request = require('request');
const apikey = 'e7a1f0798885b9cfe1b62d793f572c2f';


var getWeather = (lat, lng, callback) => {

    request({
        url: `https://api.darksky.net/forecast/${apikey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                callback(undefined,{
                    temperature: Math.round(((body.currently.temperature - 32) / 9) * 5, 2),
                    apparentTemperature: Math.round(((body.currently.apparentTemperature - 32) / 9) * 5, 2),
                    humidity: Math.round((body.currently.humidity * 100))
                });
            } else {
                callback('Unable to fetch weather. I failed!');
            }
        }
    )
};

module.exports = {
    getWeather
}
