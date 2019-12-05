const { nextISSTimesForMyLocation } = require("./iss");

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

nextISSTimesForMyLocation((error, ISSPassTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(ISSPassTimes);
});
