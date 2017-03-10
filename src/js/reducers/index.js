export default function reducer(state={}, action) {

    switch(action.type) {
        case 'TIMER_ADD': {
            let newTimer = action.payload.timer;
            return Object.assign({}, state, {[newTimer.id]: newTimer});
        }

        case 'TIMER_DESTROY': {
            let id = action.payload
            let newState = Object.assign({}, state);

            delete newState[id];

            return newState;
        }

        case 'TIMER_TOGGLE': {
            let id = action.payload;
            let timer = state[id];
                timer.started = !timer.started;

            return Object.assign({}, state, {id: timer});
        }
    }

    return state;
}
