import * as actionTypes from "./actionTypes";
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const checkAuthTimeout = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart);
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_cR-1oXRqhRRhPc1cwBv8Fv0Edvp0_m0";
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_cR-1oXRqhRRhPc1cwBv8Fv0Edvp0_m0";
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("expirationDate", expirationDate)
                localStorage.setItem("userId", response.data.localId)
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate > new Date()) {
                const data = {
                    idToken: token,
                    localId: userId
                }
                dispatch(authSuccess(data));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() / 1000)));
            } else {
                dispatch(logout());
            }
        }
    }
}

