/**
 *
 * @desc Utility helpers
 *
 */

export const isElectronApp = () => {
    return Boolean(window.require && typeof window.require === 'function');
};
