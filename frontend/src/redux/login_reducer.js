import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { take, put, all, select } from "redux-saga/effects";

let startState = {
    loginStatus: false,
};

const GET_LOGIN_STATUS = 'GET_LOGIN_STATUS';
const SET_LOGIN_STATUS = 'SET_LOGIN_STATUS';


// ACTIONS
export const getLoginStatus = status =>{
    return{
        type: GET_LOGIN_STATUS,
        payload: { status }
    }
};

function* getLoginStatusSaga() {
    while (true){
        const { payload } = yield take(GET_LOGIN_STATUS)
        const response = yield fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const responseJSON = yield response.json();
        yield put({
            type: SET_LOGIN_STATUS,
            payload: {loginStatus: responseJSON.loginStatus}
        })
    }
}



function reducer(state = startState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LOGIN_STATUS:
            return { ...state, loginStatus: payload.loginStatus };
    }
}

function* rootSaga() {
    yield all([
        getLoginStatusSaga()
    ]);
}

const saga = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(saga));
saga.run(rootSaga);