import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { take, put, all, select } from "redux-saga/effects";

let startState = {
  basketId: "",
  products: [],
  loginStatus: false,
  sliderPhotos: [],
};

export const mainColor =  "blueviolet"
// action types
const CHANGE_STATUS = "CHANGE_STATUS";
const GET_BASKET = "GET_BASKET";
const ADD_TO_BASKET = "ADD_TO_BASKET";
const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
const CLEAR_BASKET = "CLEAR_BASKET";
const CHANGE_QUANTITY = "CHANGE_QUANTITY";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const GET_SLIDER_PHOTOS = "GET_SLIDER_PHOTOS";
const SET_SLIDER_PHOTOS = "SET_SLIDER_PHOTOS";
const GET_MOST_POPULAR_PHOTOS = "GET_MOST_POPULAR_PHOTOS";
const SET_MOST_POPULAR_PHOTOS = "SET_MOST_POPULAR_PHOTOS";

//actions
export const addToBasket = product => {
  return {
    type: ADD_TO_BASKET,
    payload: product
  };
};

export const changeQuantity = product => {
  return {
    type: ADD_TO_BASKET,
    payload: product
  };
};

export const removeProduct = id => {
  return {
    type: REMOVE_PRODUCT,
    payload: id
  };
};

export const sliderPhotos = (array, setArray) => {
  return {
    type: GET_SLIDER_PHOTOS,
    payload: { array, setArray }
  };
};
export const mostPopularPhotos = (array, setArray) => {
  return {
    type: GET_MOST_POPULAR_PHOTOS,
    payload: { array, setArray }
  };
};

////////////////////////////// sagas  //////////////////////////

function* sliderPhotosSaga() {
  while (true) {
    const { payload } = yield take(GET_SLIDER_PHOTOS);
    let photoFetch = [];
    for (let i = 0; i < payload.array.length; i++) {
      const response = yield fetch(`/products/${payload.array[i]}`);
      const responseJSON = yield response.json();
      yield photoFetch.push(responseJSON);
    }
    payload.setArray(photoFetch);
    yield put({ type: SET_SLIDER_PHOTOS, payload: photoFetch });
  }
}
function* mostPopularPhotosSaga() {
  while (true) {
    const { payload } = yield take(GET_MOST_POPULAR_PHOTOS);
    let photoFetch = [];
    for (let i = 0; i < payload.array.length; i++) {
      const response = yield fetch(`/products/${payload.array[i]}`);
      const responseJSON = yield response.json();
      yield photoFetch.push(responseJSON);
    }
    payload.setArray(photoFetch);
    yield put({ type: SET_SLIDER_PHOTOS, payload: photoFetch });
  }
}
function* addToBasketSaga() {
  while (true) {
    const { payload } = yield take(ADD_TO_BASKET);
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
      payload: { basketId: res._id, products: res.products }
    });
  }
}

function* changeQuantitySaga(product) {
  while (true) {
    yield take(CHANGE_QUANTITY);
    const req = yield fetch("/change_quantity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });
    const res = yield req.json();
    yield put({ type: ADD_TO_BASKET, payload: { products: res.products } });
  }
}

function* removeProductSaga(id) {
  while (true) {
    yield take(CHANGE_QUANTITY);
    const req = yield fetch(`/remove_from_basket/${id}`);
    const res = yield req.json();
    yield put({ type: ADD_TO_BASKET, payload: { products: res.products } });
  }
}

// reducer

function reducer(state = startState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BASKET:
      return {
        ...state,
        basketId: payload.basketId,
        products: payload.products
      };
    case CHANGE_STATUS:
      return { ...state, loginStatus: payload.loginStatus };
    case CLEAR_BASKET:
      return { ...state, basketId: "", products: [] };
    case UPDATE_PRODUCTS:
      return { ...state, products: payload.products };
    case CHANGE_QUANTITY:
      return { ...state, products: payload.products };
    case REMOVE_PRODUCT:
      return { ...state, products: payload.products };
    case SET_SLIDER_PHOTOS:
      return { ...state, sliderPhotos: payload };
    case SET_MOST_POPULAR_PHOTOS:
      return { ...state, sliderPhotos: payload };
    default:
      return state;
  }
}

// root saga
function* rootSaga() {
  yield all([
    addToBasketSaga(),
    changeQuantitySaga(),
    removeProductSaga(),
    sliderPhotosSaga(),
    mostPopularPhotosSaga()
  ]);
}

const saga = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(saga));
saga.run(rootSaga);

export default store;
