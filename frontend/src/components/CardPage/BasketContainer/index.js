

import React from 'react';
import { connect } from 'react-redux';
// import { createOrder } from "../../../redux/basket";
import { removeProduct, changeQuantity, getBasket} from "../../../redux/basket";
import { Row, Col } from "antd";
import "./styles.css"


const mapStateToProps = (state) => {
    return{...state}

};

export const BasketContainer = connect(mapStateToProps, { getBasket, removeProduct, changeQuantity })(props => {


    const list = (
        <div className="data-order">
            {props.basket.products.map(({quantity, product: { name, photo, color, price, _id, id}}) => (
                <Row  type="flex" key={id} className="order">
                    <Col span={8} order={1} className="item-order">
                        <img src={`static/img/${photo[0]}`} className="img" alt="photo"/>
                        {name}
                    </Col>
                    <Col span={5} order={2} pull={1}>
                        <button onClick={()=> {
                            if(quantity > 1) {props.changeQuantity({id: _id, quantity: quantity - 1})}
                        }}>-</button>
                        <button>{quantity}</button>
                        <button onClick={ ()=> {props.changeQuantity({id: _id, quantity: quantity + 1})}}>+</button>
                    </Col>
                    <Col span={4} order={3}>
                        {color}
                    </Col>
                    <Col span={4} order={4} className="price">
                        $ {price}
                    </Col>
                    <Col span={3} order={5} push={2}>
                    <button className="item-remove" onClick={() => props.removeProduct(_id)}>
                        {`X`}
                    </button>
                    </Col>
                </Row>
            ))}
        </div>);


    return list
 });

// export default BasketContainer;