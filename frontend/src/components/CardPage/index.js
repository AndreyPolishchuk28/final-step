
import React from 'react';
import { connect } from "react-redux";
import {BasketContainer} from './BasketContainer';
import {BasketButton} from './BasketButtons';
import {CardHeader} from './CardHeader';
import {Row, Col} from "antd";
import "./styles.scss"


const mapStateToProps = (state) => {
    return{
        products: state.basket.products
    }
};

export const CardPage = connect(mapStateToProps)(props => {

        let totalPrice = 0;

        props.products.forEach(item => {
            totalPrice += item.quantity * item.product.price
        });

    return (
        <section className="main-section">
            <CardHeader/>
            <Row type="flex" className="order">
                <Col xs={24} lg={16} className="order-section">
                    <h2 className="caption-order-section">Your cart</h2>
                    <Row type="flex" className="name-price text-center">
                        <Col span={7} order={1}>Product</Col>
                        <Col span={6} order={2}>Quantity</Col>
                        <Col span={4} order={3}>Color</Col>
                        <Col span={4} order={4}>Price</Col>
                        <Col span={3} order={5}>Delete</Col>
                    </Row>
                    <BasketContainer/>
                    <div className="user-choice">
                        <div className="total-price">Total ${totalPrice}</div>
                    </div>
                </Col>
                <Col xs={24} lg={8}>
                    <BasketButton/>
                </Col>
            </Row>
        </section>
    )
});
