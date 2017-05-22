/**
 *
 * @desc Small wrapper to reuse notifications
 * @param  {Object} timer
 * @return {Object}
 *
 */
const path = require('path');
const notifier = require('node-notifier');
const {
    getTimeIn,
    formatTime } = require('../helpers');

const Notification = (opts, callback) => {
    let { timer, status } = opts;
    let durationInSeconds = getTimeIn(timer.duration, 'seconds');
    let plannedTimeInSeconds = getTimeIn(timer.plannedTime, 'seconds');
    let srcPath = path.dirname(path.dirname(__dirname));

    notifier.notify({
        title: timer.title,
        subtitle: status,
        message: `Worked/Planned - ${formatTime(durationInSeconds, 'seconds')}/${formatTime(plannedTimeInSeconds, 'seconds')}`,
        sound: 'Ping',
        icon: path.join(srcPath, 'img/app-notification-icon.png'),
        timeout: 60,
        wait: true
    });

    notifier.on('click', (notifierObject, options) => {
        callback(notifierObject, options);
    });
};

module.exports = Notification;
