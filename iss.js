const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP =  (callback) => {
  const url = 'http://ip-api.com/json/';
  request(url, (error, response, body) => {
    if (error) {
      return callback(`Unable to fetch Ip address: ${error}`, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    const data = JSON.parse(body);
    if (data['query']) {
      return callback(null, data['query']);
    }
  
  });
};

const fetchCoordsByIP  =  (callback) => {
  const url = 'http://ip-api.com/json/';
  request(url, (error, response, body) => {
    if (error) {
      return callback(`Unable to fetch Latitude, Longitdue: ${error}`, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    const data = JSON.parse(body);
    if (data['lat'] && data['lon']) {
      return callback(null,  {
        "latitude" : data['lat'],
        "longitude": data['lon']
      });
    }
  
  });
};




module.exports = { fetchMyIP, fetchCoordsByIP };



