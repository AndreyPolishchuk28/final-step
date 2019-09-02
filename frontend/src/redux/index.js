import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'

const startState = {
};

function reducer(state = startState, action){
    const {type, payload} = action;
    switch(type){
        default :
            return state
    }
}

const saga = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(saga)
);

export default store