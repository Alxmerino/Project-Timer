export default function reducer(state={
        timers: {}
    }, action) {

    switch(action.type) {
        case "ACTION_TYPE": {
            return Object.assign({}, state, {
                // new data from action
            });
        }
    }

    return state;
}
