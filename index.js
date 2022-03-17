const { fetchMyIP } = require('./iss');

fetchMyIP((error, IP) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , IP);
});

