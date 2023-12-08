const dal = require('../helpers/dal');
const TuyAPI = require('tuyapi');
const captureWindow = 1000 * 60;//60 seconds
var sensor_data = {};
exports.recordSensors = (sensors) => {
    //Connect to PostgreSQL
    dal.connect();
    //Connect to sensor to obtain Data
    Object.keys(sensors).forEach(sensor => {
        monitorSensorData(sensor, sensors);
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
    let query = `SELECT public.insertsensordata(($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8));`;
    let d = avgData(sensor_data[sensor]);
    let ts = new Date(d.datetime);
    timestamp = ts.getFullYear() + '-' + ts.getMonth() + '-' + ts.getDate()
    timestamp += ' ' + ts.getHours() + ':' + ts.getMinutes() + ':' + ts.getSeconds();
    let values = [timestamp, sensor, d['8'], d['102'], d['107'], d['110'], d['113'], d['116']];
    dal.query(query, values).then((newRow) => {
        console.log('newRow inserted!', newRow.rows);
    })
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
const monitorSensorData = (sensor, sensors) => {
    resetSensorData(sensor, true);
    const device = new TuyAPI(sensors[sensor]);
    // Find device on network
    device.find().then(() => {
        device.connect();
    });
    // Add event listeners
    device.on('connected', () => { console.log('Connected to device!'); });
    device.on('disconnected', () => {
        console.log('Disconnected from device.');
        //If disconnected, attempt to reconnect in 1 second
        setTimeout(() => {
            console.log('reconnecting');
            monitorSensorData(sensor);
        }, 1000);
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
    // Disconnect
    /*setTimeout(() => {
        device.disconnect();
        postData(sensor);
    }, 25000);*/
};