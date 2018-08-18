const AppEvents = require('../enums/AppEvents');

const toggleAppFocus = focused => {
    return {
        type: AppEvents.FOCUSED,
        payload: { focused },
    };
};

const toggleAppMenu = menuOpen => {
    return {
        type: AppEvents.MENU_TOGGLE,
        payload: { menuOpen },
    };
};


const loginWithJira = params => {
    return {
        type: AppEvents.API_REQUEST,
        payload: {
            url: '/rest/auth/1/session',
            method: 'POST',
            onSuccess: 'jiraSetLoginCookie',
            onError: 'jiraLoginError',
            data: {
                username: params.username,
                password: params.password
            },
            meta: {
                api_url: params.serverUrl
            }
        }
    };
};

const jiraSetLoginCookie = payload => {
    return {
        type: AppEvents.JIRA_SET_LOGIN_COOKIE,
        payload
    }
}

const jiraLoginError = payload => {
    return {
        type: AppEvents.JIRA_LOGIN_ERROR,
        payload
    }
}

const postTimerError401 = payload => {
    console.log('postTimerError401', payload)
    return {
        type: AppEvents.API_ERROR_401,
        payload
    }
}

const verifyLogin = () => {
    return {
        type: AppEvents.API_REQUEST,
        payload: {
            url: '/rest/auth/1/session',
            method: 'GET',
            onSuccess: 'jiraIsLoggedIn',
            onError: 'jiraIsLoggedIn',
        }
    }
}

const jiraIsLoggedIn = payload => {
    return {
        type: AppEvents.JIRA_IS_LOGGED_IN,
        payload
    }
}

module.exports = {
    toggleAppFocus,
    toggleAppMenu,
    loginWithJira,
    jiraSetLoginCookie,
    jiraLoginError,
    verifyLogin,
    jiraIsLoggedIn,
    postTimerError401,
};
