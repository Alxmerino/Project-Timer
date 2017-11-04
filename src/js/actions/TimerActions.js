const TimerEvents = require('../enums/TimerEvents');

const addTimer = (timer) => {
    return {
        type: TimerEvents.TIMER_ADD,
        payload: timer
    };
};

const destroyTimer = (id) => {
    return {
        type: TimerEvents.TIMER_DESTROY,
        payload: id
    };
};

const startTimer = (id) => {
    return {
        type: TimerEvents.TIMER_START,
        payload: id
    };
};

const stopTimer = (id) => {
    return {
        type: TimerEvents.TIMER_STOP,
        payload: id
    };
};

const updateTimer = (id) => {
    return {
        type: TimerEvents.TIMER_UPDATE,
        payload: id
    };
};

const toggleTitleChangeOn = (id) => {
    return {
        type: TimerEvents.TIMER_TITLE_CHANGE_ON,
        payload: id
    };
};

const toggleTitleChangeOff = (id) => {
    return {
        type: TimerEvents.TIMER_TITLE_CHANGE_OFF,
        payload: id
    };
};

const updateTitle = (id, title) => {
    return {
        type: TimerEvents.TIMER_TITLE_UPDATE,
        payload: {id, title}
    };
};

const toggleDurationInputOn = (id) => {
    return {
        type: TimerEvents.TIMER_DURATION_ON,
        payload: {id}
    };
};

const toggleDurationInputOff = (id) => {
    return {
        type: TimerEvents.TIMER_DURATION_OFF,
        payload: {id}
    };
};

const updateTimeDuration = (id, timeStr) => {
    return {
        type: TimerEvents.TIMER_DURATION_UPDATE,
        payload: {id, timeStr}
    };
};

const togglePlannedInputOn = (id) => {
    return {
        type: TimerEvents.TIMER_PLANNED_ON,
        payload: {id}
    };
};

const togglePlannedInputOff = (id) => {
    return {
        type: TimerEvents.TIMER_PLANNED_OFF,
        payload: {id}
    };
};

const updateTimePlanned = (id, timeStr) => {
    return {
        type: TimerEvents.TIMER_PLANNED_UPDATE,
        payload: {id, timeStr}
    };
};

const toggleDescInputOn = (id) => {
    return {
        type: TimerEvents.TIMER_DESCRIPTION_ON,
        payload: {id}
    };
};

const toggleDescInputOff = (id) => {
    return {
        type: TimerEvents.TIMER_DESCRIPTION_OFF,
        payload: {id}
    };
};

const updateTimeDescription = (id, desc) => {
    return {
        type: TimerEvents.TIMER_DESCRIPTION_UPDATE,
        payload: {id, desc}
    };
};

const resetTimer = (id) => {
    return {
        type: TimerEvents.TIMER_RESET,
        payload: id
    };
};

module.exports = {
    TimerEvents,
    addTimer,
    destroyTimer,
    startTimer,
    stopTimer,
    updateTimer,
    toggleTitleChangeOn,
    toggleTitleChangeOff,
    updateTitle,
    toggleDurationInputOn,
    toggleDurationInputOff,
    updateTimeDuration,
    togglePlannedInputOn,
    togglePlannedInputOff,
    updateTimePlanned,
    toggleDescInputOn,
    toggleDescInputOff,
    updateTimeDescription,
    resetTimer
};
