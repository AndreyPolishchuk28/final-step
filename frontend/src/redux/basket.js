import {put, take, all} from "redux-saga/effects";

// action types
const GET_BASKET = "GET_BASKET";
const ADD_TO_BASKET = "ADD_TO_BASKET";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const CREATE_ORDER = "CREATE_ORDER";
const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
const SET_ERROR = "SET_ERROR";

// actions
export const getBasket = () => {
    return {
        type: GET_BASKET
    };
};

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

export const createOrder = (payload) => {
    return {
        type: CREATE_ORDER,
        payload: payload
    };
};

// sagas
function* getBasketSaga() {
    while (true) {
        try {
            yield take(GET_BASKET);
            const req = yield fetch("/get_basket");
            const res = yield req.json();
            if (res._id) {
                yield put({
                    type: UPDATE_PRODUCTS,
                    payload: res.products
                })
            } else {
                yield put({
                    type: UPDATE_PRODUCTS,
                    payload: []
                })
            }
        } catch (e) {
            yield put({type: SET_ERROR, payload: {error: "Request failed!"}});
            console.log("Request failed!");
        }
    }
}
function* addToBasketSaga() {
    while (true) {
        try {
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
        } catch (e) {
            yield put({type: SET_ERROR, payload: {error: "Request failed!"}});
            console.log("Request failed!");
        }
    }
}

function* changeQuantitySaga() {
    while (true) {
        try {
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
        } catch (e) {
            yield put({type: SET_ERROR, payload: {error: "Request failed!"}});
            console.log("Request failed!");
        }
    }
}

function* removeProductSaga() {
    while (true) {
        try {
            const {payload} = yield take(REMOVE_PRODUCT);
            const req = yield fetch(`/remove_from_basket/${payload}`);
            const res = yield req.json();
            yield put({
                type: UPDATE_PRODUCTS,
                payload: res.products
            });
        } catch (e) {
            yield put({type: SET_ERROR, payload: {error: "Request failed!"}});
            console.log("Request failed!");
        }
    }
}

function* createOrderSaga() {
    while (true) {
        try {
            const {payload} = yield take(CREATE_ORDER);
            yield fetch('/create_order', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            yield put({
                type: UPDATE_PRODUCTS,
                payload: []
            });
        } catch (e) {
            yield put({type: SET_ERROR, payload: {error: "Request failed!"}});
            console.log("Request failed!");
        }
    }
}

// reducer
export function basketReducer(state = {products: [], error: ''}, action) {
    const {type, payload} = action;
    switch (type) {
        case UPDATE_PRODUCTS:
            return {...state, products: payload};
        case SET_ERROR:
            return {...state, error: payload.error};
        default :
            return state
    }
}

// root saga
export function* basketSaga() {
    yield all([
        getBasketSaga(),
        addToBasketSaga(),
        changeQuantitySaga(),
        removeProductSaga(),
        createOrderSaga()
    ]);
}
