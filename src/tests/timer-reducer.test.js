import moment       from 'moment';
import TimerEvents  from '../js/enums/TimerEvents';
import reducer      from '../js/reducers/TimerReducer';
import TimeTracker  from '../js/utils/TimeTracker';


// Defaults
const defaultState = {timers: {}};
const id = moment.now();
const timer = {
    id,
    title: 'Timer title',
    createdTime: id,
    started: false,
    duration: 0,
    timeTracker: TimeTracker(() => {})
};

describe('Timer reducer', () => {
    // Initial State
    it('should return the initial state', () => {

        expect(
            reducer(undefined, {})
        ).toEqual({
            timers: {}
        });
    });

    /** TIMER_ADD */
    it('should handle TIMER_ADD', () => {
        let action = {
            type: TimerEvents.TIMER_ADD,
            payload: timer
        };

        expect(
            reducer(defaultState, action)
        ).toEqual({
            // timers: expect.arrayContaining([timer])
            timers: {
                [id]: timer
            }
        });
    });

    /** TIMER_DESTROY */
    it('should handle TIMER_DESTROY', () => {
        let action = {
            type: TimerEvents.TIMER_DESTROY,
            payload: id
        };

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).toEqual({
            timers: {}
        });
    });

    /** TIMER_START */
    it('should handle TIMER_START', () => {
        let action = {
            type: TimerEvents.TIMER_START,
            payload: id
        };

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).toEqual({
            timers: {
                [id]: expect.objectContaining({
                    started: true
                })
            }
        });
    });

    /** TIMER_STOP */
    it('should handle TIMER_STOP', () => {
        let action = {
            type: TimerEvents.TIMER_STOP,
            payload: id
        };

        // Fake started timer
        timer.started = true;

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).toEqual({
            timers: {
                [id]: expect.objectContaining({
                    started: false
                })
            }
        });
    });

    /** TIMER_RESET */
    it('should handle TIMER_RESET', () => {
        let action = {
            type: TimerEvents.TIMER_RESET,
            payload: id
        };

        // Set fake duration
        timer.duration = 89000;
        timer.durationCycle = 104000;

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).toEqual({
            timers: {
                [id]: expect.objectContaining({
                    duration: 0
                })
            }
        });
    });

    /** TIMER_UPDATE */
    it('should handle TIMER_UPDATE', () => {
        let action = {
            type: TimerEvents.TIMER_UPDATE,
            payload: id
        };

        // Mock timer running for 3 seconds
        for (let i = 0; i <= 3; i++) {
            reducer( { timers: {[id]: timer} }, action )
        }

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).not.toEqual({
            timers: {
                [id]: expect.objectContaining({
                    duration: 0
                })
            }
        });
    });

    /** TIMER_TITLE_CHANGE_ON */
    it('should handle TIMER_TITLE_CHANGE_ON', () => {
        let action = {
            type: TimerEvents.TIMER_TITLE_CHANGE_ON,
            payload: id
        };

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).toEqual({
            timers: {
                [id]: expect.objectContaining({
                    editingTitle: true
                })
            }
        });
    });

    /** TIMER_TITLE_CHANGE_OFF */
    it('should handle TIMER_TITLE_CHANGE_OFF', () => {
        let action = {
            type: TimerEvents.TIMER_TITLE_CHANGE_OFF,
            payload: id
        };

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).not.toEqual({
            timers: {
                [id]: expect.objectContaining({
                    editingTitle: true
                })
            }
        });
    });

    /** TIMER_TITLE_UPDATE */
    it('should handle TIMER_TITLE_UPDATE', () => {
        let action = {
            type: TimerEvents.TIMER_TITLE_UPDATE,
            payload: {id, title: 'New timer title'}
        };

        // Expect new title
        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).toEqual({
            timers: {
                [id]: expect.objectContaining({
                    title: 'New timer title'
                })
            }
        });

        // Expect editing prop to be removed
        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).not.toEqual({
            timers: {
                [id]: expect.objectContaining({
                    editingTitle: true
                })
            }
        });
    });

    /** TIMER_DURATION_ON */
    it('should handle TIMER_DURATION_ON', () => {
        let action = {
            type: TimerEvents.TIMER_DURATION_ON,
            payload: {id}
        };

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).toEqual({
            timers: {
                [id]: expect.objectContaining({
                    editingDuration: true
                })
            }
        });
    });

    /** TIMER_DURATION_OFF */
    it('should handle TIMER_DURATION_OFF', () => {
        let action = {
            type: TimerEvents.TIMER_DURATION_OFF,
            payload: {id}
        };

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).not.toEqual({
            timers: {
                [id]: expect.objectContaining({
                    editingDuration: true
                })
            }
        });
    });

    /** TIMER_DURATION_UPDATE */
    it('should handle TIMER_DURATION_UPDATE', () => {
        let action = {
            type: TimerEvents.TIMER_DURATION_UPDATE,
            payload: {id, timeStr: '2:37:33'}
        };

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).toEqual({
            timers: {
                [id]: expect.objectContaining({
                    duration: 9453000
                })
            }
        });
    });


    /** TIMER_PLANNED_ON */
    it('should handle TIMER_PLANNED_ON', () => {
        let action = {
            type: TimerEvents.TIMER_PLANNED_ON,
            payload: {id}
        };

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).toEqual({
            timers: {
                [id]: expect.objectContaining({
                    editingPlannedTime: true
                })
            }
        });
    });

    /** TIMER_PLANNED_OFF */
    it('should handle TIMER_PLANNED_OFF', () => {
        let action = {
            type: TimerEvents.TIMER_PLANNED_OFF,
            payload: {id}
        };

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).not.toEqual({
            timers: {
                [id]: expect.objectContaining({
                    editingDuration: true
                })
            }
        });
    });

    /** TIMER_PLANNED_UPDATE */
    it('should handle TIMER_PLANNED_UPDATE', () => {
        let action = {
            type: TimerEvents.TIMER_PLANNED_UPDATE,
            payload: {id, timeStr: '23:09:01'}
        };

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).toEqual({
            timers: {
                [id]: expect.objectContaining({
                    plannedTime: 83341000
                })
            }
        });
    });

    /** TIMER_DESCRIPTION_ON */
    it('should handle TIMER_DESCRIPTION_ON', () => {
        let action = {
            type: TimerEvents.TIMER_DESCRIPTION_ON,
            payload: {id}
        };

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).toEqual({
            timers: {
                [id]: expect.objectContaining({
                    editingDescription: true
                })
            }
        });
    });

    /** TIMER_DESCRIPTION_OFF */
    it('should handle TIMER_DESCRIPTION_OFF', () => {
        let action = {
            type: TimerEvents.TIMER_DESCRIPTION_OFF,
            payload: {id}
        };

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).not.toEqual({
            timers: {
                [id]: expect.objectContaining({
                    editingDescription: true
                })
            }
        });
    });

    /** TIMER_DESCRIPTION_UPDATE */
    it('should handle TIMER_DESCRIPTION_UPDATE', () => {
        let action = {
            type: TimerEvents.TIMER_DESCRIPTION_UPDATE,
            payload: {id, desc: 'New description'}
        };

        expect(
            reducer({
                timers: {[id]: timer}
            }, action)
        ).toEqual({
            timers: {
                [id]: expect.objectContaining({
                    description: 'New description'
                })
            }
        });
    });

});
