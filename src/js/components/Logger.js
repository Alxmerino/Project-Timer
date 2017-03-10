/**
 *  Debugger
 *  @author Rene Merino
 *  @desc   Utility component to help debugging app, only works when
 *          query string `debug` is present in the url or is a
 *          local environment
 */

const DEFAULT_NAME = 'Logger';

class Logger {

    constructor(name) {
        this.name = (typeof(name) !== 'undefined') ? name : DEFAULT_NAME;
        this.debugMode = (window.location.href.indexOf('localhost') > -1) ||
                     (window.location.href.indexOf('debug=true') > -1)

        this.log('Initialized');
    }

}

Logger.prototype = Object.assign(Logger.prototype, {
    log() {
        if (!this.debugMode) {
            return;
        }

        var args = Array.prototype.slice.call(arguments);
        args.unshift('%c['+ this.name +']', 'background: #222; color: #e3e3e3');
        console.log.apply(console, args);
    },

    debug() {
        if (!this.debugMode) {
            return;
        }

        var args = Array.prototype.slice.call(arguments);
        args.unshift('%c['+ this.name +']', 'background: #222; color: #e3e3e3');
        console.debug.apply(console, args);
    },

    warn() {
        if (!this.debugMode) {
            return;
        }

        var args = Array.prototype.slice.call(arguments);
        args.unshift('%c['+ this.name +']', 'background: #222; color: #e3e3e3');
        console.warn.apply(console, args);
    },

    error() {
        if (!this.debugMode) {
            return;
        }

        var args = Array.prototype.slice.call(arguments);
        args.unshift('%c['+ this.name +']', 'background: #222; color: #e3e3e3');
        console.error.apply(console, args);
    }
});

export default Logger;
