import AppEvents   from '../enums/AppEvents';

export const func = () => {
    return {
        type: AppEvents.FOCUSED,
        payload: {}
    };
};

export const toggleAppMenu = (menuOpen) => {
    return {
        type: AppEvents.MENU_TOGGLE,
        payload: {menuOpen}
    };
};

