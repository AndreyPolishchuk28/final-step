import {put, take} from "redux-saga/effects";

// action types
const GET_CATEGORIES = "GET_CATEGORIES";
const SET_CATEGORIES = "SET_CATEGORIES";
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

export const getCategories = () => {
    return{
        type: GET_CATEGORIES
    }
};

// sagas

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

function* getCategoriesSaga() {
    while (true) {
        yield take(GET_CATEGORIES);
        const req = yield fetch('/categories');
        const res = yield req.json();
        yield put({type: SET_CATEGORIES, payload: res})
    }
}

// reducer

export function catalogReducer(state, action){
    const {type, payload} = action;
    switch(type){
        case SET_PRODUCTS:
            return {...state, products: payload};
        case SET_MORE_PRODUCTS:
            return {...state, products: [...state.products, payload]};
        case SET_CATEGORIES:
            return {...state, categories: payload};
        default :
            return state
    }
}