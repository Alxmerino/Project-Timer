export const addTimer = (timer) => {
    return {
        type: 'TIMER_ADD',
        payload: timer
    };
};

export const destroyTimer = (id) => {
    return {
        type: 'TIMER_DESTROY',
        payload: id
    };
};

export const startTimer = (id) => {
    return {
        type: 'TIMER_START',
        payload: id
    };
};

export const stopTimer = (id) => {
    return {
        type: 'TIMER_STOP',
        payload: id
    };
};

export const toggleTimer = (id) => {
    return {
        type: 'TIMER_TOGGLE',
        payload: id
    };
};

export const updateTimer = (id) => {
    return {
        type: 'TIMER_UPDATE',
        payload: id
    };
};

export const toggleTitleChangeOn = (id) => {
    return {
        type: 'TIMER_TITLE_CHANGE_ON',
        payload: id
    };
};

export const toggleTitleChangeOff = (id) => {
    return {
        type: 'TIMER_TITLE_CHANGE_OFF',
        payload: id
    };
};

export const updateTitle = (id, title) => {
    return {
        type: 'TIMER_TITLE_UPDATE',
        payload: {id, title}
    };
};

export const toggleDurationInputOn = (id) => {
    return {
        type: 'TIMER_DURATION_ON',
        payload: {id}
    };
};

export const toggleDurationInputOff = (id) => {
    return {
        type: 'TIMER_DURATION_OFF',
        payload: {id}
    };
};

export const updateTimeDuration = (id, timeStr) => {
    return {
        type: 'TIMER_DURATION_UPDATE',
        payload: {id, timeStr}
    };
};

export const togglePlannedInputOn = (id) => {
    return {
        type: 'TIMER_PLANNED_ON',
        payload: {id}
    };
};

export const togglePlannedInputOff = (id) => {
    return {
        type: 'TIMER_PLANNED_OFF',
        payload: {id}
    };
};

export const updateTimePlanned = (id, timeStr) => {
    return {
        type: 'TIMER_PLANNED_UPDATE',
        payload: {id, timeStr}
    };
};

export const toggleDescInputOn = (id) => {
    return {
        type: 'TIMER_DESCRIPTIOND_ON',
        payload: {id}
    };
};

export const toggleDescInputOff = (id) => {
    return {
        type: 'TIMER_DESCRIPTION_OFF',
        payload: {id}
    };
};

export const updateTimeDescription = (id, desc) => {
    return {
        type: 'TIMER_DESCRIPTION_UPDATE',
        payload: {id, desc}
    };
};

export const resetTimer = (id) => {
    return {
        type: 'TIMER_RESET',
        payload: id
    };
};
