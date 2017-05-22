const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        },
         f: {
            demand: false,
            alias: 'format',
            describe: 'format C for Celcius F for Farhenheit. Defaults to Celcius.',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.a); // turns spaces into '%20' for example
var temperatureFormat = argv.f;
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var apikey = 'e7a1f0798885b9cfe1b62d793f572c2f';
    var weatherUrl = `https://api.darksky.net/forecast/${apikey}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = Math.round(((response.data.currently.temperature - 32) / 9) * 5, 2);
    var apparentTemperature = Math.round(((response.data.currently.apparentTemperature - 32) / 9) * 5, 2);
    var humidity = Math.round((response.data.currently.humidity * 100));
    var temperatureF = response.data.currently.temperature;
    var apparentTemperatureF = response.data.currently.apparentTemperature;
    if (temperatureFormat === "F" || temperatureFormat === "f") {
        console.log(`It's currently ${temperatureF} degrees Fahrenheit. It feels like ${apparentTemperatureF}. Humidity levels are at ${humidity}%.`);
    } else {
        console.log(`It's currently ${temperature} degrees Celsius. It feels like ${apparentTemperature}. Humidity levels are at ${humidity}%.`); }
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});