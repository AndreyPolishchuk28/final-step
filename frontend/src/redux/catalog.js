import {put, take, all} from "redux-saga/effects";

// action types
const GET_MAIN_INFO = "GET_MAIN_INFO";
const SET_MAIN_INFO = "SET_MAIN_INFO";
const GET_PRODUCTS = "GET_PRODUCTS";
const SET_PRODUCTS = "SET_PRODUCTS";
const SET_MORE_PRODUCTS = "SET_MORE_PRODUCTS";
const GET_SEARCH_PRODUCTS = "GET_SEARCH_PRODUCTS";
const SET_SEARCH_PRODUCTS = "SET_SEARCH_PRODUCTS";

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

export const getSearchProducts = (payload) => {
    return{
        type: GET_SEARCH_PRODUCTS,
        payload: payload
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
            yield put({type: SET_PRODUCTS, payload: {products: res, showMoreBtnStatus: true}})
        } else if (res.length) {
            yield put({type: SET_MORE_PRODUCTS, payload: {products: res, showMoreBtnStatus: true}})
        } else {
            yield put({type: SET_MORE_PRODUCTS, payload: {products: res, showMoreBtnStatus: false}})
        }
    }
}

function* getSearchProductSaga() {
    while (true) {
        const {payload} = yield take(GET_SEARCH_PRODUCTS);
        const req = yield fetch('/product_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const res = yield req.json();
        yield put({type: SET_SEARCH_PRODUCTS, payload: res})
    }
}

// reducer
let startState = {
    categories: [],
    products: [],
    sliderProducts: [],
    mostPopularProducts: [],
    searchProducts: [],
    showMoreBtnStatus: true

};

export function catalogReducer(state = startState, action){
    const {type, payload} = action;
    switch(type){
        case SET_PRODUCTS:
            return {...state, products: payload.products, showMoreBtnStatus: payload.showMoreBtnStatus};
        case SET_MORE_PRODUCTS:
            return {...state, products: [...state.products, ...payload.products], showMoreBtnStatus: payload.showMoreBtnStatus};
        case SET_MAIN_INFO:
            return {...state, ...payload};
        case SET_SEARCH_PRODUCTS:
            return {...state, searchProducts: payload};
        default :
            return state
    }
}


// root saga
export function* catalogSaga() {
    yield all([
        getMainInfoSaga(),
        getProductsSaga(),
        getSearchProductSaga()
    ]);
}
