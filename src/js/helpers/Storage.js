import xStore from 'xStore'

let Storage = (function() {
    let store = new xStore('projectTimer:', localStorage);

    return store;
})();

export default Storage
