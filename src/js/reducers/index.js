export default function reducer(state={
        // default state
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
