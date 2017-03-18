import moment       from 'moment';
import reducer      from '../src/js/reducers';
import TimeTracker  from '../src/js/containers/TimeTracker'

// Defaults
const defaultState = {timers: []};
const id = moment.now();
const timer = {
    id,
    title: 'Timer title',
    createdTime: id,
    started: false,
    duration: 0,
    timeTracker: new TimeTracker(() => {})
};

describe('Timer reducer', () => {
    // Initial State
    it('should return the initial state', () => {

        expect(
            reducer(undefined, {})
        ).toEqual({
            timers: []
        });
    });

    /** TIMER_ADD */
    it('should handle TIMER_ADD', () => {
        let action = {
            type: 'TIMER_ADD',
            payload: timer
        };

        expect(
            reducer(defaultState, action)
        ).toEqual({
            timers: expect.arrayContaining([timer])
        });
    });

    /** TIMER_DESTROY */
    it('should handle TIMER_DESTROY', () => {
        let action = {
            type: 'TIMER_DESTROY',
            payload: id
        };

        expect(
            reducer({
                timers: [timer]
            }, action)
        ).toEqual({
            timers: []
        });
    });

    /** TIMER_START */
    it('should handle TIMER_START', () => {
        let action = {
            type: 'TIMER_START',
            payload: id
        };

        expect(
            reducer({
                timers: [timer]
            }, action)
        ).toEqual({
            timers: [
                expect.objectContaining({
                    started: true
                })
            ]
        });
    });

    /** TIMER_STOP */
    it('should handle TIMER_STOP', () => {
        let action = {
            type: 'TIMER_STOP',
            payload: id
        };

        // Fake started timer
        timer.started = true;

        expect(
            reducer({
                timers: [timer]
            }, action)
        ).toEqual({
            timers: [
                expect.objectContaining({
                    started: false
                })
            ]
        });
    });

    /** TIMER_UPDATE */
    it('should handle TIMER_UPDATE', () => {
        let action = {
            type: 'TIMER_UPDATE',
            payload: id
        };

        expect(
            reducer({
                timers: [timer]
            }, action)
        ).not.toEqual({
            timers: [
                expect.objectContaining({
                    duration: 0
                })
            ]
        });
    });

    /** TIMER_TITLE_CHANGE_TOGGLE */
    it('should handle TIMER_TITLE_CHANGE_TOGGLE', () => {
        let action = {
            type: 'TIMER_TITLE_CHANGE_TOGGLE',
            payload: id
        };

        expect(
            reducer({
                timers: [timer]
            }, action)
        ).toEqual({
            timers: [
                expect.objectContaining({
                    editingTitle: true
                })
            ]
        });
    });

    /** TIMER_TITLE_UPDATE */
    it('should handle TIMER_TITLE_UPDATE', () => {
        let action = {
            type: 'TIMER_TITLE_UPDATE',
            payload: {id, title: 'New timer title'}
        };

        // Expect new title
        expect(
            reducer({
                timers: [timer]
            }, action)
        ).toEqual({
            timers: [
                expect.objectContaining({
                    title: 'New timer title'
                })
            ]
        });

        // Expect editing prop to be removed
        expect(
            reducer({
                timers: [timer]
            }, action)
        ).not.toEqual({
            timers: [
                expect.objectContaining({
                    editingTitle: true
                })
            ]
        });
    });

});
