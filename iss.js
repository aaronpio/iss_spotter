const request = require("request");

const fetchMyIP = callback => {
  request("https://api.ipify.org?format=json", (err, res, body) => {
    if (err) {
      callback(err, null);
    } else if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const IP = JSON.parse(body).ip;
      callback(null, IP);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (err, res, body) => {
    if (err) {
      callback(err, null);
    } else if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching latitude/longitude. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const latitude = JSON.parse(body).data.latitude;
      const longitude = JSON.parse(body).data.longitude;
      callback(null, { latitude, longitude });
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    (err, res, body) => {
      if (err) {
        callback(err, null);
      } else if (res.statusCode !== 200) {
        const msg = `Status Code ${res.statusCode} when fetching ISS fly over times. Response: ${body}`;
        callback(Error(msg), null);
      } else {
        const data = JSON.parse(body);
        callback(null, data.response);
      }
    }
  );
};

const nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(`${ip}`, (err, data) => {
      if (err) {
        return callback(err, null);
      }
      fetchISSFlyOverTimes(data, (err, timesData) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, timesData);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation
};
