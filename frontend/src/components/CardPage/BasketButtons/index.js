
import React from 'react';
import { Link } from "react-router-dom";
import "./styles.scss"

export const BasketButton =() => {

    return (

        <div className="button-wrap">
                    <Link to="/checkout" className="checkout-button text-center">proceed to checkout</Link>
                    <Link className="continue-button text-center" to="/">continue shopping</Link>
        </div>
    )
};