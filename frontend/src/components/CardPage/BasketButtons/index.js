
import React from 'react';
import {Button} from "antd";


export const BasketButton = () => {
    return (
        <div className="button-wrap">
            <Button className="checkout-button" type="primary submit" block>proceed to checkout</Button>
            <Button className="continue-button" type="primary" href="./ProductListPage" block>continue shopping</Button>
        </div>
    )
};