const path = require('path');
const Logger = require('../components/Logger');
const { isElectronApp } = require('../utils/utils');
const {
    getTimeIn,
    formatTime } = require('../helpers');

/* eslint-disable no-unused-vars */
const Debug = new Logger('App');
/* eslint-enable no-unused-vars */

let audio;

/**
 *
 * @desc Check if the browser supports notifications
 * @return {Boolean}
 *
 */
const checkNotificationSupport = () => {
    return ('Notification' in window);
};

/**
 *
 * @desc Ask the user permission to receive notifications
 * @return {[type]} [description]
 *
 */
const requestNotificationPermission = () => {
    // Bail early if no support
    if (!checkNotificationSupport()) {
        return;
    }

    let userPermission = false;

    // Preload notification sound
    preloadSound();

    // Lets check whether notification permissions have already been granted
    if (window.Notification.permission === 'granted') {
        userPermission = true;
    } else if (window.Notification.permission !== 'denied') {
        // Ask the user for permission
        window.Notification.requestPermission(function(permission) {
            if (permission === 'granted') {
                userPermission = true;
            }
        });
    }

    return userPermission;
};

/**
 *
 * @desc Preload notification sound
 * @return {void}
 *
 */
const preloadSound = () => {
    let srcPath = path.dirname(path.dirname(__dirname));
    let notificationAudio = path.join(srcPath, 'audio/notification.mp3');

    audio = new window.Audio();
    audio.src = notificationAudio;
};

/**
 *
 * @desc Fire an Notification
 *
 */
let TimerNotify = (opts) => {
    let notification;
    let granted = requestNotificationPermission();
    let { timer } = opts;
    let durationInSeconds = getTimeIn(timer.duration, 'seconds');
    let plannedTimeInSeconds = getTimeIn(timer.plannedTime, 'seconds');
    let srcPath = path.dirname(path.dirname(__dirname));

    if (granted) {
        notification = new window.Notification(timer.title, {
            title: timer.title,
            body: `Worked/Planned - ${formatTime(durationInSeconds, 'seconds')}/${formatTime(plannedTimeInSeconds, 'seconds')}`,
            icon: path.join(srcPath, 'img/app-notification-icon.png'),
            silent: (!isElectronApp())
        });

        // Play sound
        audio.play();

        return notification;
    }
};

module.exports = {
    TimerNotify,
    requestNotificationPermission
};
