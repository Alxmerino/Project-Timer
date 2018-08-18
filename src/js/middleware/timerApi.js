const _ = require('underscore');
const moment = require('moment');
const TimerEvents = require('../enums/TimerEvents');
const AppEvents = require('../enums/AppEvents');
const { getTimerById } = require('../helpers');

const validActions = [
    TimerEvents.TIMER_POST
];

const timerApi = ({dispatch, getState}) => next => action => {
    // Bail early if is not a valid action we want to intersect
    if (validActions.indexOf(action.type) === -1) {
        return next(action);
    }

    // Get timer and app
    const timer = getTimerById(getState(), action.payload.id);
    const app = getState().AppReducer;

    if (!timer) {
        return next(action);
    }

    // Handle valid actions
    // switch (action.type) {
    //     case TimerEvents.TIMER_POST:
    //     break;
    // }

    // Get timer data
    const issueId = timer.title;
    const started = timer.postedTime;
    const timerDuration = moment.duration(timer.duration);
    const durationAsSecs = Math.round(timerDuration.asSeconds());
    const data = {
        comment: timer.description,
        timeSpentSeconds: durationAsSecs,
        started: started
    }

    // Get login info
    const login_info = app.login_info;

    // @TODO: Verify user is logged in with a GET to /rest/auth/1/session
    // passing in the cookie and if not show message to redirect to
    // login page, add skip top app link on login page

    // Update action
    let newAction = { type: AppEvents.API_REQUEST };
    newAction.payload = _.assign({}, action.payload, {
        data,
        url: action.payload.url.replace('{issueIdOrKey}', issueId),
        meta: {
            api_url: login_info.api_url
        },
        headers: { cookie: login_info.cookie }
    });

    // Dispatch new action as an API request
    dispatch(newAction);
}

module.exports = timerApi;
