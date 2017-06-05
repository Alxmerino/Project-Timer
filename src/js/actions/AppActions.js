const AppEvents = require('../enums/AppEvents');

const toggleAppFocus = (focused) => {
    return {
        type: AppEvents.FOCUSED,
        payload: {focused}
    };
};

const toggleAppMenu = (menuOpen) => {
    return {
        type: AppEvents.MENU_TOGGLE,
        payload: {menuOpen}
    };
};

module.exports = {
    toggleAppFocus,
    toggleAppMenu
};
