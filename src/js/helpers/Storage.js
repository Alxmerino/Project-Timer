import xStore from 'xStore';

let Storage = (function() {
    let store = new xStore('projectTimer:', window.localStorage);

    return store;
})();

export default Storage;
