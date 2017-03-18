import moment from 'moment';

import * as actions from '../src/js/actions'

/** Test Actions */
describe('actions', () => {

    it('should create an action to add a timer', () => {
        let id = moment.now();
        const timer = {
            id,
            title: 'New title',
            createdTime: id,
            started: false,
            duration: 0,
            plannedTime: '00:00:00',
        };

        const expectedAction = {
            type: 'TIMER_ADD',
            payload: timer
        };

        expect(actions.addTimer(timer)).toEqual(expectedAction);
    });

});
