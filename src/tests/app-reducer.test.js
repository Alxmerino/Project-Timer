import AppEvents  from '../js/enums/AppEvents';
import reducer  from '../js/reducers/AppReducer';
/**
 *
 * Defaults
 *
 */
const defaultState = {
    menuOpen: false,
    focused: false
}

describe('AppEvents reducer', () => {

    // Initial state
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(defaultState)
    });

    it('should handle AppEvents.MENU_TOGGLE', () => {
        let action = {
            type: AppEvents.MENU_TOGGLE,
            payload: {menuOpen: true}
        };

        expect(
            reducer(defaultState, action)
        ).toEqual(expect.objectContaining({
            menuOpen: true
        }));
    });

    it('should handle AppEvents.FOCUSED', () => {
        let action = {
            type: AppEvents.FOCUSED,
            payload: {focused: true}
        }

        expect(
            reducer(defaultState, action)
        ).toEqual(expect.objectContaining({
            focused: true
        }));
    });

});
