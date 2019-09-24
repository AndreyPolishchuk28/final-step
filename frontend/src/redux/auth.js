import {put, take, all} from "redux-saga/effects";



// action types

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const GET_LOGIN_STATUS = 'GET_LOGIN_STATUS';
const CREATE_NEW_USER = 'CREATE_NEW_USER';
const GET_USER_INFO = 'GET_USER_INFO';
const CHANGE_USER_INFO = 'CHANGE_USER_INFO';
const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
const SET_CHANGE_PASSWORD_STATUS = 'SET_CHANGE_PASSWORD_STATUS';
const CLEAR_CHANGE_PASSWORD_STATUS = 'CLEAR_CHANGE_PASSWORD_STATUS';
const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
const SET_LOGIN_ERRORS = 'SET_LOGIN_ERRORS';
const SET_REGISTRATION_ERRORS = 'SET_REGISTRATION_ERRORS';
const SET_USER_INFO = 'SET_USER_INFO';
const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';
const CLEAR_REGISTRATION_ERRORS = 'CLEAR_REGISTRATION_ERRORS';

// actions
export const login = payload =>{
    return{
        type: LOGIN,
        payload: payload
    }
};

export const getLoginStatus = () =>{
    return{
        type: GET_LOGIN_STATUS
    }
};

export const logout = () =>{
    return{
        type: LOGOUT
    }
};

export const createNewUser = (payload) =>{
    return{
        type: CREATE_NEW_USER,
        payload: payload
    }
};

export const getUserInfo = () =>{
    return{
        type: GET_USER_INFO,
    }
};

export const changeUserInfo = (payload) =>{
    return{
        type: CHANGE_USER_INFO,
        payload: payload
    }
};

export const changePassword = (payload) =>{
    return{
        type: CHANGE_PASSWORD,
        payload: payload
    }
};

export const clearChangePasswordStatus = () =>{
    return{
        type: CLEAR_CHANGE_PASSWORD_STATUS,
    }
};

export const clearLoginErrors = () =>{
    return{
        type: CLEAR_LOGIN_ERRORS
    }
};

export const clearRegistrationErrors = () =>{
    return{
        type: CLEAR_REGISTRATION_ERRORS
    }
};

// sagas

function* loginSaga() {
    while (true){
        const { payload } = yield take(LOGIN);
        const response = yield fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const res = yield response.json();
        if (res.loginStatus) {
            yield put({type: SET_LOGIN_STATUS, payload: {loginStatus: true}});
            payload.history.push('/')
        } else {
            yield put({type: SET_LOGIN_ERRORS, payload: {loginStatus: false, loginErrorMessage: res.message}});
        }
    }
}

function* logoutSaga() {
    while (true){
        yield take(LOGOUT);
        yield fetch('/logout');
        yield put({type: SET_LOGIN_STATUS, payload: {loginStatus: false}})
    }
}

function* getLoginStatusSaga() {
    while (true){
        yield take(GET_LOGIN_STATUS);
        const response = yield fetch('/get_login_status');
        const res = yield response.json();
        if (res.loginStatus){
            yield put({type: SET_LOGIN_STATUS, payload: {loginStatus: true}})
        }else{
            yield put({type: SET_LOGIN_STATUS, payload: {loginStatus: false}})
        }
    }
}

function* createNewUserSaga() {
    while (true){
        const { payload } = yield take(CREATE_NEW_USER);
        const response = yield fetch('/new_user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const res = yield response.json();
        if (res.registered) {
            yield put({type: SET_LOGIN_STATUS, payload: {loginStatus: true}});
            payload.history.push('/')
        } else {
            yield put({type: SET_REGISTRATION_ERRORS, payload: {loginStatus: true, registrationErrorMessage: res.message}})
        }
    }
}

function* getUserInfoSaga() {
    while (true){
        yield take(GET_USER_INFO);
        const response = yield fetch('/get_user_info');
        const res = yield response.json();
        yield put({type: SET_USER_INFO, payload: res})
    }
}

function* changeUserInfoSaga() {
    while (true){
        const { payload } = yield take(CHANGE_USER_INFO);
        const response = yield fetch('/change_user_info', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const res = yield response.json();
        yield put({type: SET_USER_INFO, payload: res})
    }
}

function* changePasswordSaga() {
    while (true){
        const { payload } = yield take(CHANGE_PASSWORD);
        const response = yield fetch('/change_password', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const res = yield response.json();
        yield put({type: SET_CHANGE_PASSWORD_STATUS, payload: res})
    }
}


// reducer

const startState = {
    loginStatus: false,
    loginErrorMessage: '',
    registrationError: '',
    changePasswordStatus: ''
};

export function authReducer(state = startState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_LOGIN_STATUS:
            return { ...state, loginStatus: payload.loginStatus, loginErrorMessage: '', registrationError: ''};
        case SET_USER_INFO:
            return { ...state, userInfo: payload};
        case SET_LOGIN_ERRORS:
            return { ...state, loginStatus: false, loginErrorMessage: payload.loginErrorMessage};
        case SET_REGISTRATION_ERRORS:
            return { ...state, loginStatus: false, registrationErrorMessage: payload.registrationErrorMessage};
        case CLEAR_LOGIN_ERRORS:
            return { ...state, loginStatus: false, loginErrorMessage: ''};
        case CLEAR_REGISTRATION_ERRORS:
            return { ...state, loginStatus: false, registrationErrorMessage: ''};
        case SET_CHANGE_PASSWORD_STATUS:
            return { ...state, changePasswordStatus: payload.changePasswordStatus};
        case CLEAR_CHANGE_PASSWORD_STATUS:
            return { ...state, changePasswordStatus: ''};
        default :
            return state
    }
}

// root saga
export function* authSaga() {
    yield all([
        loginSaga(),
        logoutSaga(),
        createNewUserSaga(),
        getLoginStatusSaga(),
        getUserInfoSaga(),
        changeUserInfoSaga(),
        changePasswordSaga()
    ]);
}
