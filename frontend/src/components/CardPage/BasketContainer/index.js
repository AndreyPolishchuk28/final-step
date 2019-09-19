

import React, {useState, useEffect} from 'react';
import { Counter } from "./Counter/Counter";
import { connect } from 'react-redux';
// import { createOrder } from "../../../redux/basket";
import { removeProduct } from "../../../redux/basket"
import { getBasket } from "../../../redux/basket";
// import mapStateToProps from "react-redux/es/connect/mapStateToProps";


const mapStateToProps = (state) => {
    return{...state}

};

export const BasketContainer = connect(mapStateToProps, { getBasket })(props => {

    const dataBasket = props.basket.products.map(({product}) => ({product}) );
    const data = dataBasket.map(({product: {name, photo, color, price}}) => ({name, photo, color, price}));

    const orderName = (
        <div>
            {data.map( (product) =>
                <div key={product.name}>
                    {product.name}
                </div>
            )}
        </div>
    );
    const orderColor = (
        <div>
            {data.map( (product) =>
              <div key={product.color}>
                  {product.color}
              </div>
            )}
        </div>
    );
    const orderPrice = (
        <div>
        {data.map( (product) =>
            <div key={product.price}>
                {product.price}
            </div>
            )}
        </div>
    );
    /*return (
        <div>
            {orderName}
            <Counter/>
            {orderColor}
            {orderPrice}
        </div>
    );*/




    // const [state, setState] = useState({});
    //      console.log('state',state)

    // const customerBasketRes = async () => {
    //         props.getBasket({
    //              // id: productId,
    //         })
    // }

    return(

        <ul className="data-order">
            {orderName}
            <Counter/>
            {orderColor}
            {orderPrice}
            <button onClick={removeProduct}>X</button>

        </ul>
    )
});

// export default BasketContainer;