import * as actionTypes from '../Actions/actionTypes';
import { utilityMethod } from '../Utilities/Utility'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.AUTH_START):
            return utilityMethod(state, { error: null, loading: true });

        case (actionTypes.AUTH_SUCCESS):
            return utilityMethod(state, { token: action.idToken, userId: action.userId, error: null, loading: false });

        case (actionTypes.AUTH_FAIL):
            return utilityMethod(state, { error: action.error, loading: false });

        case (actionTypes.AUTH_LOGOUT):
            return utilityMethod(state, { token: null, userId: null })

        case (actionTypes.SET_AUTH_REDIRECT_PATH):
            return utilityMethod(state, { authRedirectPath: action.path })
        default:
            return state;
    }
}

export default authReducer;