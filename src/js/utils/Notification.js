const path = require('path');
/**
 *
 * @desc Small wrapper to reuse notifications
 * @param  {Object} timer
 * @return {Object}
 *
 */
const notifier = require('node-notifier');
const {
    getTimeIn,
    formatTime } = require('../helpers');

const Notification = (timer) => {
    let durationInSeconds = getTimeIn(timer.duration, 'seconds');
    let plannedTimeInSeconds = getTimeIn(timer.plannedTime, 'seconds');
    let iconPath = path.dirname(path.dirname(__dirname));

    return notifier.notify({
        title: timer.title,
        message: `Worked/Planned - ${formatTime(durationInSeconds, 'seconds')}/${formatTime(plannedTimeInSeconds, 'seconds')}`,
        sound: 'Sosumi',
        icon: path.join(iconPath, 'img/app-notification-icon.png'),
        timeout: 10
    });
};

module.exports = Notification;
