exports.milliToTS = (dte) => {
    const ts = new Date(dte);
    const timestamp = ts.getFullYear() + '-' + (ts.getMonth() + 1) + '-' + ts.getDate() + ' ' + dbleDigits(ts.getHours()) + ':' + dbleDigits(ts.getMinutes()) + ':' + dbleDigits(ts.getSeconds());
    return timestamp;
};
const dbleDigits = (num) => {
    return ((num.length === 1) ? '0' : '') + num;
};