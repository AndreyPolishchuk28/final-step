

import React from 'react';
import { connect } from 'react-redux';
// import { createOrder } from "../../../redux/basket";
import { removeProduct, changeQuantity, getBasket} from "../../../redux/basket";
import "./styles.css"


const mapStateToProps = (state) => {
    return{...state}

};

export const BasketContainer = connect(mapStateToProps, { getBasket, removeProduct, changeQuantity })(props => {


    const list = (
        <ul className="data-order">
            {props.basket.products.map(({quantity, product: { name, photo, color, price, id}}) => (
                <li key={id} className="order">
                    <div>
                        <img src={`static/img/${photo[0]}`} className="img" alt="photo"/>
                        {name}
                    </div>
                    <div>
                        <button onClick={()=> {
                            if(quantity > 1) props.changeQuantity(quantity - 1)
                        }}>-</button>
                        <button>{quantity}</button>
                        <button onClick={ ()=> {props.changeQuantity({id, quantity: quantity + 1})}}>+</button>
                    </div>
                    <div>
                        {color}
                    </div>
                    <div className="price">
                        $ {price}
                    </div>
                    <button className="item-remove" onClick={() => props.removeProduct(id)}>
                        {`X`}
                    </button>
                </li>
            ))}
        </ul>);


    return list
 });

// export default BasketContainer;