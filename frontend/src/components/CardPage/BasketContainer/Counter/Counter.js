

import React from 'react';
import { useState } from 'react';
import {connect} from "react-redux";
import {getBasket} from "../../../../redux/basket";
// import { changeQuantity } from "../../../../redux/basket";

const mapStateToProps = (state) => {
    return{...state}

};

export const Counter =() =>{
    const productQuantity = connect(mapStateToProps, { getBasket })(props => {
        const prod = props.basket.products;
        prod.map(elem => {
            return elem.quantity
        });
    });
    const [count, setCount] = useState(1);
    return(
        <div>
            <button onClick={() => {
                if (count > 1)  setCount (count - 1)}}>-</button>
            <button>{ count }</button>
            <button onClick={() => setCount (count + 1)}>+</button>
        </div>
    )
};
