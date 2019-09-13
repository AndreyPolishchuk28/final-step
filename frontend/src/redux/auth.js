import {put, take, all} from "redux-saga/effects";


// action types

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const CREATE_NEW_USER = 'CREATE_NEW_USER';
const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';

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

// reducer

export function authReducer(state = {loginStatus: false}, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_LOGIN_STATUS:
            return { ...state, loginStatus: payload.loginStatus };
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
