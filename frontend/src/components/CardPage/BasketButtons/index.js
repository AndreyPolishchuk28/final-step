
import React from 'react';
import {Button} from "antd";

export const BasketButton =(props) => {
    console.log(props);
    return (

        <div className="button-wrap">
            <Button className="checkout-button" type="primary" href="./checkout" block>proceed to checkout</Button>
            <Button className="continue-button" type="primary" href="/" block>continue shopping</Button>
        </div>
    )
};