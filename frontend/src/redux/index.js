import {createStore} from 'redux'

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
        case 'CHANGE_STATUS':
            return {...state, loginStatus: payload.loginStatus};
        case 'CLEAR_BASKET':
            return {...state, basketId: '', products: []};
        case 'CHANGE_QUANTITY':
            return {...state, products: payload.products};
        case 'REMOVE_PRODUCT':
            return {...state, products: payload.products};
        default :
            return state
    }
}
