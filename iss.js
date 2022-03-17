const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */




const fetchMyIP = (callback) => {
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








const fetchCoordsByIp = (IP, callback) => {
  const url = `https://freegeoip.app/json/${IP}`;
  request(url, (error, response, body) => {
    if (error) {
      return callback(`Unable to fetch Latitude, Longitdue by IP: ${error}`, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    const data = JSON.parse(body);
    if (data['latitude'] && data['longitude']) {
      return callback(null, {
        "latitude": data['latitude'],
        "longitude": data['longitude']
      });
    }

  });
};



const fetchISSbycoordinates = (coordinates, callback) => {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  request(url, (error, response, body) => {


    if (error) {
      return callback(`Unable to fetch ISSbycoordinates: ${error}`, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    if (data.response) {
      return callback(null, data.response)
    }



  });
};


const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIp(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSbycoordinates(coordinates, (error, flyOvers) => {
        if (error) {
          return callback(error, null);
        }
        if (!flyOvers) {
          return callback(`No flyover found`, null);
        }
        return callback(null, flyOvers);
      })
    });
  });
};




module.exports = { fetchMyIP, fetchCoordsByIp, nextISSTimesForMyLocation };



