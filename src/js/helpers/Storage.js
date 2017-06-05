const xStore = require('xStore');

let Storage = (function() {
    let store = new xStore('projectTimer:', window.localStorage);

    return store;
})();

module.exports = Storage;
