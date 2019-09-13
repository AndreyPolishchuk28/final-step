import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import {all} from "redux-saga/effects";
import {authReducer, authSaga} from "./auth";
import {basketReducer, basketSaga} from "./basket";
import {catalogReducer, catalogSaga} from "./catalog";

let startState = {
  basketId: "",
  productsToDisplay: [],
  choosedProducts: [],
  loginStatus: false,
  sliderPhotos: [],
};

export const mainColor =  "blueviolet";

// reducer

const reducer = combineReducers({
  auth: authReducer,
  basket: basketReducer,
  catalog: catalogReducer
});


// root saga
function* rootSaga() {
  yield all([
      authSaga(),
      basketSaga(),
      catalogSaga()
  ]);
}

const saga = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(saga));
saga.run(rootSaga);

export default store;
