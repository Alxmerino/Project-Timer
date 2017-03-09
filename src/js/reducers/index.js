export default function reducer(state={}, action) {

    switch(action.type) {
        case "TIMER_ADD": {
            let newTimer = action.payload.timer;
            return Object.assign({}, state, {[newTimer.id]: newTimer});
        }
    }

    return state;
}
