export default function reducer(state={
        timers: {}
    }, action) {

    switch(action.type) {
        case "TIMER_ADD": {
            return Object.assign({}, state, action.payload);
        }
    }

    return state;
}
