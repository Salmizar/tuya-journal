export const one =  {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    week: 1000 * 60 * 60 * 24 * 7,
    month: 1000 * 60 * 60 * 24 * 7 * 30,
    year: 1000 * 60 * 60 * 24 * 7 * 360
}
export const timeSince = (milliseconds) => {
    if (milliseconds > one.week) {//weeks
        return Math.floor(milliseconds / one.week)+' weeks ago';
    } else if (milliseconds > one.day) {//days
        return Math.floor(milliseconds / one.day)+' days ago';
    } else if (milliseconds > one.hour) {//hours
        return Math.floor(milliseconds / one.hour)+' hr ago';
    } else if (milliseconds > one.minute) {//minutes
        return Math.floor(milliseconds / one.minute)+' min ago';
    } else if (milliseconds > one.second) {//seconds
        return Math.floor(milliseconds / one.second)+' sec ago';
    } else {
        return 'Now';
    }
};
export const formatSensorData = (sensorData) => {
    switch( sensorData[0]) {
        case "temp":
            return sensorData[1]/10+'°C';
        case "ph":
            return sensorData[1]/100;
        case "tds":
        case "sal":
            return sensorData[1]+' PPM';
        case "ec":
            return sensorData[1]+' US';
        case "sg":
            return sensorData[1]/1000;
    }
    return sensorData
}
export const formatProperSensorName = (sensorData) => {
    switch( sensorData) {
        case "temp":
            return "Temperature";
        case "ph":
            return "PH";
        case "tds":
            return "TDS";
        case "sal":
            return "Salinity";
        case "ec":
            return "Electrical Conductivity";
        case "sg":
            return "Specific Gravity";
    }
}
export const formatSensorName = (sensorData) => {
    switch( sensorData) {
        case "temp":
            return "temperature";
        case "ph":
            return "PH";
        case "tds":
            return "total disolved solids";
        case "sal":
            return "salinity";
        case "ec":
            return "electrical conductivity";
        case "sg":
            return "specific gravity";
    }
}