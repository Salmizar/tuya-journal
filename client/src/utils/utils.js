export const one = {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    week: 1000 * 60 * 60 * 24 * 7,
    month: 1000 * 60 * 60 * 24 * 7 * 30,
    year: 1000 * 60 * 60 * 24 * 365
}
export const dteFormat = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', };
export const formatDate = (dte) => {
    return new Intl.DateTimeFormat('en-US', dteFormat).format(new Date(dte));
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
export const formatSensorData = (sensorData, addDescrptor=true) => {
    switch( sensorData[0]) {
        case "temp":
            let c = sensorData[1]/10;
            if (process.env.REACT_APP_UNIT==='F') {
                return (c*1.8+32).toFixed(1)+((addDescrptor)?'°F':'');
            } else {
                return c.toFixed(1)+((addDescrptor)?'°C':'');
            }
        case "ph":
            return sensorData[1]/100;
        case "tds":
        case "sal":
            return sensorData[1]+((addDescrptor)?' PPM':'');
        case "ec":
            return sensorData[1]+((addDescrptor)?' US':'');
        default://"sg"
            return sensorData[1]/1000;
    }
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
        default://"sg"
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
        default://"sg"
            return "specific gravity";
    }
}