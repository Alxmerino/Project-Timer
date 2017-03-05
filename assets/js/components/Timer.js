const moment    = require('moment');
const timer    = require('moment-timer');

// var intervalContainer = document.getElementById("interval");
// var startTick = new Date().getTime();
// var interval = moment.duration(1, "seconds").timer({
//     loop: true,
//     wait: 1000,
//     executeAfterWait: true
// },
// function() {
//     console.log('Runnine', new Date().getTime())
//     // intervalContainer.innerHTML += "Callback fired "
//     // + (new Date().getTime() - startTick)
//     // + "ms after script was started.<br>";
// });

function BuildTimer(callback) {
    return moment.duration(1, "seconds").timer({
        loop: true,
        start: false
    }, callback);
}

module.exports = BuildTimer;
