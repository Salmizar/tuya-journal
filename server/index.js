const express = require("express");
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const app = express();
const sensors = require('./sensors.json');

const tuya_monitor = require('./helpers/tuya_monitor');
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'production') {
  // If in production, have Node serve the files for our built React app
  app.use(express.static(path.resolve(__dirname, '../client/build')));
}

// Main API Requests
app.get("/api", cors(), (req, res) => {
    res.json({ message: "Hello from server!" });
});
app.get("/sensors", cors(), (req, res) => {
  res.json(sensors);
});
//End of Main API Requests

if (process.env.NODE_ENV === 'production') {
  // If in production, All other GET requests not handled before this will return our React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  // Start listening for TuyaEvents and record them
  tuya_monitor.recordSensors(sensors);
});
