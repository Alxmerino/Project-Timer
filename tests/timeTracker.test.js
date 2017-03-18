import TimeTracker from '../src/js/containers/TimeTracker'

describe('Time tracker', () => {

    it('should be instantiated with Timer props', () => {
        let timeTracker = new TimeTracker(() => {});

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
