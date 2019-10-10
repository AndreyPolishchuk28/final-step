

import React from 'react';
import { connect } from 'react-redux';
import { removeProduct, changeQuantity, getBasket} from "../../../redux/basket";
import { Row, Col } from "antd";
import "./styles.css"


const mapStateToProps = (state) => {
    return{...state}

};

export const BasketContainer = connect(mapStateToProps, { getBasket, removeProduct, changeQuantity })(props => {


    return (
        <div className='products-wrapper'>
            {props.basket.products.map(({quantity, product: { name, photo, color, price, _id, id}}) => (
                <Row  type="flex" key={id} className="product-row">
                    <Col span={8} order={1} className='product-name'>
                        <img src={`static/img/${photo[0]}`} className="img product-img" alt=""/>
                        {name.toUpperCase()}
                    </Col>
                    <Col span={5} order={2} className="text-center">
                        <button className="quantity-dec" onClick={()=> {
                            if(quantity > 1) {props.changeQuantity({id: _id, quantity: quantity - 1})}}}>-</button>
                        <button className="quantity">{quantity}</button>
                        <button className="quantity-inc" onClick={ ()=> {props.changeQuantity({id: _id, quantity: quantity + 1})}}>+</button>
                    </Col>
                    <Col span={4} order={3} className="text-center">
                        {color}
                    </Col>
                    <Col span={4} order={4} className="text-center">
                        $ {price}
                    </Col>
                    <Col span={3} order={5} className="text-center">
                    <button className="item-remove" onClick={() => props.removeProduct(_id)}>
                        X
                    </button>
                    </Col>
                </Row>
            ))}
        </div>);

 });
