import TimeTracker from '../js/containers/TimeTracker'

describe('Time tracker', () => {

    it('should be instantiated with Timer props', () => {
        let timeTracker = TimeTracker(() => {});

        expect(timeTracker).toEqual(
            expect.objectContaining({
                loop: true,
                started: false,
                stopped: false,
                timerDuration: 1000
            })
        );
    });

});
