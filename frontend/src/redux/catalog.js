import {put, take, all, takeLatest} from "redux-saga/effects";

// action types
const GET_MAIN_INFO = "GET_MAIN_INFO";
const SET_MAIN_INFO = "SET_MAIN_INFO";
const GET_PRODUCTS = "GET_PRODUCTS";
const SET_PRODUCTS = "SET_PRODUCTS";
const SET_MORE_PRODUCTS = "SET_MORE_PRODUCTS";
const GET_SEARCH_PRODUCTS = "GET_SEARCH_PRODUCTS";
const SET_SEARCH_PRODUCTS = "SET_SEARCH_PRODUCTS";
const GET_PRODUCT_DETAILS = "GET_PRODUCT_DETAILS";
const SET_PRODUCT_DETAILS = "SET_PRODUCT_DETAILS";
const SET_ERROR = "SET_ERROR";

// actions
export const getProducts = (payload) => {
    return{
        type: GET_PRODUCTS,
        payload: payload
    }
};

// get product id
export const getProductDetails = (payload) => {
    return {
        type: GET_PRODUCT_DETAILS,
        payload: payload
    }
}


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

function* getProductDetailsSaga() {
    while (true) {
        try {
            const {payload} = yield take(GET_PRODUCT_DETAILS);
            const req = yield fetch(`/products/${payload}`);
            const res = yield req.json();
            yield put({type: SET_PRODUCT_DETAILS, payload: res})
        } catch (e) {
            yield put({type: SET_ERROR, payload: {error: "Request failed!"}});
            console.log("Request failed!");
        }
    }
}

function* getMainInfoSaga() {
    while (true) {
        try {
            yield take(GET_MAIN_INFO);
            const req = yield fetch('/main_info');
            const res = yield req.json();
            yield put({type: SET_MAIN_INFO, payload: res})
        } catch (e) {
            yield put({type: SET_ERROR, payload: {error: "Request failed!"}});
            console.log("Request failed!");
        }
    }
}


function* getProductsSaga() {
    while (true) {
        try {
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
        } catch (e) {
            yield put({type: SET_ERROR, payload: {error: "Request failed!"}});
            console.log("Request failed!");
        }
    }
}

function* getSearchProductSaga(action) {
    try {
        const req = yield fetch('/product_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.payload)
        });
        const res = yield req.json();
        yield put({type: SET_SEARCH_PRODUCTS, payload: res})
    } catch (e) {
            yield put({type: SET_ERROR, payload: {error: "Request failed!"}});
            console.log("Request failed!");
    }
}

function* getSearchProductWatcher() {
    yield takeLatest(GET_SEARCH_PRODUCTS, getSearchProductSaga);
}


// reducer
let startState = {
    categories: [],
    products: [],
    sliderProducts: [],
    mostPopularProducts: [],
    searchProducts: [],
    showMoreBtnStatus: true,
    currentProductDetails: {},
    error: ''
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
            return { ...state, searchProducts: payload };
        case SET_PRODUCT_DETAILS: 
            return { ...state, currentProductDetails: payload};
        case SET_ERROR:
            return { ...state, error: payload.error};
        default :
            return state
    }
}


// root saga
export function* catalogSaga() {
    yield all([
        getMainInfoSaga(),
        getProductsSaga(),
        getSearchProductWatcher(),
        getProductDetailsSaga()
    ]);
}
