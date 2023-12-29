const express = require("express");
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const app = express();
const sensors = require('./sensors.json');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

const tuya_monitor = require('./helpers/tuya_monitor');
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  // If in production, have Node serve the files for our built React app
  app.use(express.static(path.resolve(__dirname, '../client/build')));
}

// Main API Requests
app.get("/api/sensors", cors(), (req, res) => {
  res.json(sensors);
});
app.use('/api/sensor/', cors(), require('./routes/sensor'));
app.use('/api/journal/', cors(), require('./routes/journal'));
app.use('/api/journals/', cors(), require('./routes/journals'));
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
