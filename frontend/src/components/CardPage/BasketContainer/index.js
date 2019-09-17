

import React, {useState, useEffect} from 'react';
import { Counter } from "./Counter/Counter";
import { connect } from 'react-redux';
import { createOrder } from "../../../redux/basket";
// import { removeProduct } from "../../../redux/basket"


const mapStateToProps = (state) => {
    return{...state}

};

export const BasketContainer = connect(mapStateToProps, { createOrder })(props => {
    const product = props.basket.products;
     const productId = product.id;
    console.log('props',props)
    const [state, setState] = useState({});
        console.log('state',state)

    const customerBasketRes = async () => {
            props.createOrder({
                 id: productId,




            })
    }


    function removeProduct() {
        console.log("hi")
    }


    return(
        <ul className="data-order">
            <div> {state.id} </div>
            <Counter/>
            <div> {state.color} </div>
            <div>$ {state.price} </div>
            <button onClick={removeProduct}>X</button>
        </ul>
    )
});

// export default BasketContainer;