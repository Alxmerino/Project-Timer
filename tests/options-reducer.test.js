import OptionEvents  from '../src/js/enums/OptionEvents';
import reducer  from '../src/js/reducers/options';
/**
 *
 * Defaults
 *
 */
const defaultState = {
    menuOpen: false,
    focused: false
}

describe('OptionEvents reducer', () => {

    // Initial state
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(defaultState)
    });

    it('should handle OptionEvents.MENU_TOGGLE', () => {
        let action = {
            type: OptionEvents.MENU_TOGGLE,
            payload: {menuOpen: true}
        };

        expect(
            reducer(defaultState, action)
        ).toEqual(expect.objectContaining({
            menuOpen: true
        }));
    });

    it('should handle OptionEvents.FOCUSED', () => {
        let action = {
            type: OptionEvents.FOCUSED,
            payload: {focused: true}
        }

        expect(
            reducer(defaultState, action)
        ).toEqual(expect.objectContaining({
            focused: true
        }));
    });

});
