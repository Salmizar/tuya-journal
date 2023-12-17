const dal = require('../helpers/dal');
const misc = require('../helpers/misc');
const TuyAPI = require('tuyapi');
const captureWindow = 1000 * 60;
const reconnectTimeout = 1000 * 30 ;
var sensors = {};
var sensor_data = {};
exports.recordSensors = (sensrs) => {
    //Connect to PostgreSQL
    dal.connect();
    //Connect to sensor to obtain Data
    sensors = sensrs;
    Object.keys(sensors).forEach(sensor => {
        //Ignore fake test device from logging procedure
        if (sensors[sensor].id != 'hp2391e1c2789530901sdM') {
            monitorSensorData(sensor);
        }
    });
};
const avgData = (data) => {
    val = { ...data };
    Object.keys(val).forEach((key) => {
        if (key != 'count' && key != 'datetime') {
            val[key] = Math.round(parseInt(val[key]) / parseInt(val.count));
        }
    });
    return val;
}
const postData = (sensor) => {
    let query = `SELECT * from public.insertsensordata(($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8));`;
    let d = avgData(sensor_data[sensor]);
    let values = [misc.milliToTS(d.datetime), sensors[sensor].id, d['8'], d['102'], d['107'], d['110'], d['113'], d['116']];
    dal.query(query, values).then((data) => {
        console.log(`New Record inserted for sensor: ${sensors[sensor].id}`);
    });
    resetSensorData(sensor);
}
const updateData = (sensor, attribute, value) => {
    //attribute 119 is last refresh event
    if (parseInt(attribute) != 119) {
        sensor_data[sensor][attribute] = parseInt(value) + parseInt(sensor_data[sensor][attribute]);
    } else {
        sensor_data[sensor].count++;
        if ((Date.now() - sensor_data[sensor].datetime) > captureWindow) {
            postData(sensor);
        }
    }
}
const resetSensorData = (sensor, isNew = false) => {
    sensor_data[sensor] = {
        //If new, set datetime to expired, so when data is
        //recieved, data is immedaitely posted
        reconnectTimer: 0,
        'datetime': Date.now() - ((isNew) ? captureWindow : 0),
        'count': 0,
        '8': 0,
        '102': 0,
        '107': 0,
        '110': 0,
        '113': 0,
        '116': 0
    };
}
const reconnectTimer = (sensor) => {
    //Add a reconnection method, so it the connection times out, it'll retry
    console.log('reconnectTimer');
    sensor_data[sensor].reconnectTimer = setTimeout(() => {
        console.log('Connection timed out, reconnecting');
        monitorSensorData(sensor);
    }, reconnectTimeout);
}
const monitorSensorData = (sensor) => {
    resetSensorData(sensor, true);
    const device = new TuyAPI(sensors[sensor]);
    //Find device on network
    console.log('attempting to find sensor:', sensor);
    device.find().then(() => {
        console.log('Device found, attempting to connect to:', sensor);
        device.connect();
    });
    //Add event listeners
    device.on('connected', () => { 
        clearInterval(sensor_data[sensor].reconnectTimer);
        console.log('Connected to device!');
    });
    device.on('disconnected', () => {
        console.log('Disconnected from device.');
        //Reconnect on disconnect
        reconnectTimer(sensor);
    });
    device.on('error', error => { console.log('Error!', error); });
    device.on('dp-refresh', data => {
        let key = Object.keys(data.dps)[0];
        switch (parseInt(key)) {
            case 8:
            case 102:
            case 107:
            case 110:
            case 113:
            case 116:
            case 119:
                updateData(sensor, key, data.dps[key]);
                break;
        }
    });
    device.on('data', data => {
        if (data.dps) {
            Object.keys(data.dps).forEach(s_data => {
                updateData(sensor, s_data, data.dps[s_data]);
            });
        }
    });
    reconnectTimer(sensor);
};