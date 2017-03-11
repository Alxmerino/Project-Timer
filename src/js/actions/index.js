export const addTimer = (timer, timeTracker) => {
    return {
        type: 'TIMER_ADD',
        payload: {timer, timeTracker}
    }
}

export const destroyTimer = (id) => {
    return {
        type: 'TIMER_DESTROY',
        payload: id
    }
}

export const toggleTimer = (id) => {
    return {
        type: 'TIMER_TOGGLE',
        payload: id
    }
}
