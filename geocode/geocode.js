const request = require('request');

var geocodeAddress = (address, callback) => {

    var encodedAddress = encodeURIComponent(address); // turns spaces into '%20' for example
//console.log(argv);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        //console.log(JSON.stringify(response, undefined, 2)); // pretty print - doesn't clip objects and prints them out in a readable way
        if (error) {
            callback('Unable to connect to Google Servers.');
        } else if (body.status === 'ZERO_RESULTS'){
            callback('Invalid Address.');
        } else if (body.status === 'OK' ) {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });

}

//module.exports.geocodeAddress = geocodeAddress;

// or - since the export is named the same as the function
module.exports = {
    geocodeAddress
}