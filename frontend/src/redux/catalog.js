import {put, take, all} from "redux-saga/effects";

// action types
const GET_MAIN_INFO = "GET_MAIN_INFO";
const SET_MAIN_INFO = "SET_MAIN_INFO";
const GET_PRODUCTS = "GET_PRODUCTS";
const SET_PRODUCTS = "SET_PRODUCTS";
const SET_MORE_PRODUCTS = "SET_MORE_PRODUCTS";

// actions
export const getProducts = (payload) => {
    return{
        type: GET_PRODUCTS,
        payload: payload
    }
};

export const getMainInfo = () => {
    return{
        type: GET_MAIN_INFO
    }
};

// sagas

function* getMainInfoSaga() {
    while (true) {
        yield take(GET_MAIN_INFO);
        const req = yield fetch('/main_info');
        const res = yield req.json();
        yield put({type: SET_MAIN_INFO, payload: res})
    }
}


function* getProductsSaga() {
    while (true) {
        const {payload} = yield take(GET_PRODUCTS);
        const {clearOld} = payload;
        const req = yield fetch('/get_products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const res = yield req.json();
        if (clearOld) {
            yield put({type: SET_PRODUCTS, payload: res})
        } else {
            yield put({type: SET_MORE_PRODUCTS, payload: res})
        }
    }
}

// reducer
let startState = {
    categories: [],
    products: [],
    sliderProducts: [],
    mostPopularProducts: []
};

export function catalogReducer(state = startState, action){
    const {type, payload} = action;
    switch(type){
        case SET_PRODUCTS:
            return {...state, products: payload};
        case SET_MORE_PRODUCTS:
            return {...state, products: [...state.products, payload]};
        case SET_MAIN_INFO:
            return {...state, ...payload};
        default :
            return state
    }
}


// root saga
export function* catalogSaga() {
    yield all([
        getMainInfoSaga(),
        getProductsSaga()
    ]);
}
