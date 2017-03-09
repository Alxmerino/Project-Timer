export default function reducer(state={}, action) {

    switch(action.type) {
        case "TIMER_ADD": {
            let newTimer = action.payload.timer;
            return Object.assign({}, state, {[newTimer.id]: newTimer});
        }

        case "TIMER_DESTROY": {
            let id = action.payload
            let newState = Object.assign({}, state);

            delete newState[id];

            return newState;
        }
    }

    return state;
}
