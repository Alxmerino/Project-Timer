const xStore = require('xStore');

let Storage = (function() {
    let store = {};
    let _store;
    if (typeof xStore === 'object') {
        _store = new xStore.xStore('projectTimer:', window.localStorage);
    }

    if (typeof xStore === 'function') {
        _store = new xStore('projectTimer:', window.localStorage);
    }

    store.set = function(key, value) {
        return _store.set(key, value);
    }

    store.remove = function(keys) {
        return _store.remove(keys);
    }

    store.timers = () => {
        let timers = {};
        let all = _store.all();

        // Filter out non-timer storage
        for (let prop in all) {
            const timer = all[prop];

            if (timer.hasOwnProperty('timeTracker')) {
                timers[prop] = timer;
            }
        }

        return timers;
    }

    store.all = function() {
        return _store.all();
    }

    return store;
})();

module.exports = Storage;
