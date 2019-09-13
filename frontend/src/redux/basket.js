import {put, take, all} from "redux-saga/effects";

// action types
const ADD_TO_BASKET = "ADD_TO_BASKET";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";

// actions
export const addToBasket = (payload) => {
    return {
        type: ADD_TO_BASKET,
        payload: payload
    };
};

export const changeQuantity = (payload) => {
    return {
        type: CHANGE_QUANTITY,
        payload: payload
    };
};

export const removeProduct = (payload) => {
    return {
        type: REMOVE_PRODUCT,
        payload: payload
    };
};

// sagas
function* addToBasketSaga() {
    while (true) {
        const {payload} = yield take(ADD_TO_BASKET);
        const req = yield fetch("/add_to_basket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const res = yield req.json();
        yield put({
            type: UPDATE_PRODUCTS,
            payload: res.products
        });
    }
}

function* changeQuantitySaga() {
    while (true) {
        const {payload} = yield take(CHANGE_QUANTITY);
        const req = yield fetch("/change_quantity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const res = yield req.json();
        yield put({
            type: UPDATE_PRODUCTS,
            payload: res.products
        });
    }
}

function* removeProductSaga() {
    while (true) {
        const {payload} = yield take(REMOVE_PRODUCT);
        const req = yield fetch(`remove_from_basket/${payload}`);
        const res = yield req.json();
        yield put({
            type: UPDATE_PRODUCTS,
            payload: res.products
        });
    }
}

// reducer
export function basketReducer(state = {products: []}, action) {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_PRODUCTS:
            return {...state, products: payload};
        default :
            return state
    }
}

// root saga
export function* basketSaga() {
    yield all([
        addToBasketSaga(),
        changeQuantitySaga(),
        removeProduct()
    ]);
}
