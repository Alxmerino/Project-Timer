import AppEvents    from '../js/enums/AppEvents';
import * as act     from '../js/actions/AppActions';

describe('App actions', () => {

    it('should create an action to toggle the app\'s menu', () => {

        const expectedAction = {
            type: AppEvents.MENU_TOGGLE,
            payload: {menuOpen: true}
        };

        expect(act.toggleAppMenu(true)).toEqual(expectedAction);
    });

});
