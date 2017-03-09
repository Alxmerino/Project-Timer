export const addTimer() {
    return {
        type: 'TIMER_ADD'
    }
}

export const destroyTimer(id) {
    return {
        type: 'TIMER_DESTROY'
    }
}
