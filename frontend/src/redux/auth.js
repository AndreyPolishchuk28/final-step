import {put, take, all} from "redux-saga/effects";


// action types

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const CREATE_NEW_USER = 'CREATE_NEW_USER';
const GET_USER_INFO = 'GET_USER_INFO';
const CHANGE_USER_INFO = 'CHANGE_USER_INFO';
const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';
const SET_USER_INFO = 'SET_USER_INFO';

// actions
export const login = payload =>{
    return{
        type: LOGIN,
        payload: payload
    }
};

export const logout = () =>{
    return{
        type: LOGOUT
    }
};

export const createNewUser = (payload) =>{
    return{
        type: LOGOUT,
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
            yield put({type: SET_LOGIN_STATUS, payload: {loginStatus: true}})
        } else {
            alert('loginStatus: false')
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
            yield put({type: SET_LOGIN_STATUS, payload: {loginStatus: true}})
        } else {
            alert('registered: false')
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

// reducer

export function authReducer(state = {loginStatus: false}, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_LOGIN_STATUS:
            return { ...state, loginStatus: payload.loginStatus };
        case SET_USER_INFO:
            return { ...state, userInfo: payload};
        default :
            return state
    }
}

// root saga
export function* authSaga() {
    yield all([
        loginSaga(),
        logoutSaga(),
        createNewUserSaga()
    ]);
}
