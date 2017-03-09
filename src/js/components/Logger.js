/**
 *  Debugger
 *  @author Rene Merino
 *  @desc   Utility component to help debugging app, only works when
 *          query string `debug` is present in the url or is a
 *          local environment
 */

const DEFAULT_NAME = 'Logger';
const _            = require('underscore');

function Logger(name) {
    this.name = (typeof(name) !== 'undefined') ? name : DEFAULT_NAME;

    this.debug = (window.location.href.indexOf('localhost') > -1) ||
                 (window.location.href.indexOf('debug=true') > -1)

    this.log('Initialized');
}

Logger.prototype = _.extend(Logger.prototype, {
    log() {
        if (!this.debug) {
            return;
        }

        var args = Array.prototype.slice.call(arguments);
        args.unshift('['+ this.name +']');
        console.log.apply(console, args);
    },

    debug() {
        if (!this.debug) {
            return;
        }

        var args = Array.prototype.slice.call(arguments);
        args.unshift('['+ this.name +']');
        console.debug.apply(console, args);
    },

    warn() {
        if (!this.debug) {
            return;
        }

        var args = Array.prototype.slice.call(arguments);
        args.unshift('['+ this.name +']');
        console.warn.apply(console, args);
    },

    error() {
        if (!this.debug) {
            return;
        }

        var args = Array.prototype.slice.call(arguments);
        args.unshift('['+ this.name +']');
        console.error.apply(console, args);
    }
});

module.exports = Logger;
