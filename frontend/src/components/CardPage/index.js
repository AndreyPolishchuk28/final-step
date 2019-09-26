
import React from 'react';
import { connect } from "react-redux";
import {BasketContainer} from './BasketContainer';
import {BasketButton} from './BasketButtons';
import {CardHeader} from './CardHeader';
import "./styles.scss"


const mapStateToProps = (state) => {
    return{
        products: state.basket.products
    }
};

export const CardPage = connect(mapStateToProps)(props => {

    let totalPrice = 0;

        props.products.map(item => {
            totalPrice += item.quantity* item.product.price
        });

    return (
        <section className="main-section">
            <CardHeader/>
            <section className="order">
                <div className="order-section">
                    <h2 className="caption-order-section">Your cart</h2>
                    <ul className="order-category text-center">
                        <div className="category">Product</div>
                        <div className="category">Quantity</div>
                        <div className="category">Color</div>
                        <div className="category">Price</div>
                        <div>Delete</div>
                    </ul>
                    <BasketContainer/>
                    <div className="user-choice">
                        <div className="total-price">Total ${totalPrice}</div>
                    </div>
                </div>
                <BasketButton/>
            </section>
        </section>
    )
});
