const request = require("request-promise-native");

const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = ip => {
  const IP = JSON.parse(ip).ip;
  return request(`https://ipvigilante.com/${IP}`);
};

const fetchISSFlyOverTimes = body => {
  const latitude = JSON.parse(body).data.latitude;
  const longitude = JSON.parse(body).data.longitude;
  return request(
    `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
  );
};

const printPassTimes = ISSPassTimes => {
  for (const pass of ISSPassTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(
      `Next pass is on ${datetime} and will take ${duration} seconds!`
    );
  }
};

const nextISSTimesForMyLocation = () => {
  fetchMyIP()
    .then(body => fetchCoordsByIP(body))
    .then(coords => fetchISSFlyOverTimes(coords))
    .then(passTimes => printPassTimes(JSON.parse(passTimes).response))
    .catch(error => {
      console.log("It didn't work dummy: ", error.message);
    });
};

module.exports = { nextISSTimesForMyLocation };
