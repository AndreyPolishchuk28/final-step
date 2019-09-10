import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

let startState = {};



//const saga = createSagaMiddleware();

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    //applyMiddleware(saga)
);

export default store

function reducer(state = startState, action){
    const {type, payload} = action;
    switch(type){
        case 'start_basket':
            return payload;
        default :
            return state
    }
}
