import {createStore, applyMiddleware} from 'redux'

let startState = {
    basketId: "",
    products: [],
    loginStatus: false
};

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store

function reducer(state = startState, action){
    const {type, payload} = action;
    switch(type){
        case 'start_basket':
            return {...state, basketId: payload.basketId, products: payload.products};
        case 'ADD_TO_BASKET':
            return {...state, basketId: payload.basketId, products: payload.products};
        case 'CHANGE_STATUS':
            return {...state, loginStatus: payload.loginStatus};
        default :
            return state
    }
}
