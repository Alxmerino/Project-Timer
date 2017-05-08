import AppEvents   from '../enums/AppEvents';

export const toggleAppFocus = (focused) => {
    return {
        type: AppEvents.FOCUSED,
        payload: {focused}
    };
};

export const toggleAppMenu = (menuOpen) => {
    return {
        type: AppEvents.MENU_TOGGLE,
        payload: {menuOpen}
    };
};
