

import React, {useState, useEffect} from 'react';
import {Counter} from "./Counter/Counter";
import {connect} from 'react-redux';


const mapStateToProps = (state) => {
    return{...state}
};

export const BasketContainer = connect(mapStateToProps)(props => {
    console.log(props)
    const [state, setState] = useState({});



    function handleDelete() {
        console.log("hi")
    }


    return(
        <ul className="data-order">
            <div> {state.id} </div>
            <Counter/>
            <div> {state.color} </div>
            <div>$ {state.price} </div>
            <button onClick={handleDelete}>X</button>
        </ul>
    )
});

// export default BasketContainer;