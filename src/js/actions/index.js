export const addTimer = (timer) => {
    return {
        type: 'TIMER_ADD',
        payload: timer
    }
}

export const destroyTimer = (id) => {
    return {
        type: 'TIMER_DESTROY',
        payload: id
    }
}
