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

/**
 * @desc Checks whether we are in dev mode in the electron app
 * @source https://github.com/sindresorhus/electron-is-dev
 * @return {Boolean}
 */
const isDev = () => {
    const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
    const isEnvSet = 'ELECTRON_IS_DEV' in process.env;

    return isEnvSet ? getFromEnv : (process.defaultApp || /node_modules[\\/]electron[\\/]/.test(process.execPath));
}

module.exports = {
    isElectronApp,
    isDev
};
