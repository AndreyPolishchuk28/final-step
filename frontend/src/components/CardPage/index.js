
import React from 'react';
// import {Counter} from './Counter';
import {Link} from "react-router-dom";
import { Button } from "antd";
import "./styles.scss";
import {BasketContainer} from './BasketContainer';
import {BasketButton} from './BasketButtons';
import {CardHeader} from './CardHeader';
// import { getBasket } from "../../redux/basket";
// import { connect } from 'react-redux';
// import mapStateToProps from "react-redux/es/connect/mapStateToProps";



/*const mapStateToProps = (state) => {
    return{...state}
};*/
export const CardPage = (props) => {
    /*const basket = connect(mapStateToProps, { getBasket }) (props => {

    });*/


    const  totalPrice = 90;


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
                        <div> </div>
                    </ul>
                    <BasketContainer/>
                    <div className="user-choice">
                        <div className="total-price">Total {totalPrice}</div>
                    </div>
                </div>
                <BasketButton/>
            </section>
        </section>
    )
};
