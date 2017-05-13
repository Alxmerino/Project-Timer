/**
 *
 * @desc Utility helpers
 *
 */

/**
 *
 * @desc Quick check to see if we're in an electron environment
 * @return {Boolean}
 *
 */
const isElectronApp = () => {
    return Boolean(window.require && typeof window.require === 'function');
};

module.exports = {
    isElectronApp
};
