const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
} = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }
//   console.log("it worked, returned IP: ", ip);
// });

// fetchCoordsByIP("67.71.216.6", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });

// fetchISSFlyOverTimes(
//   { latitude: "43.63190", longitude: "-79.37160" },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(data);
//   }
// );

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  console.log(passTimes);
});
