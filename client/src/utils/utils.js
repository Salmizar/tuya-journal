const one =  {
    second: 1000,
    minute: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
    week: 1000 * 60 * 60 * 24 * 7
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