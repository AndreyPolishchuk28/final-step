import React from 'react'

import {connect} from 'react-redux'
import {getUserInfo} from '../../redux/auth'

import './scss/orders.scss'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const FullOrder = connect(mapStateToProps, {getUserInfo})((props) => {

    const dataArr = props.auth.userInfo.orders.filter(item => props.id === item._id)

    const data = dataArr[0];

    const allProducts = data.product_items.map((item, index) => {
            return (
                <div className="full-order-info__products__items"  key={index}>
                    <h1 className="full-order-info__products__text">Model: {item.product.name}</h1>
                    <h1 className="full-order-info__products__text">Category: {item.product.category}</h1>
                    <h1 className="full-order-info__products__text">Price for one: {item.product.price}$</h1>
                    <h1 className="full-order-info__products__text">Quantity: {item.quantity}x</h1>
                </div>
                )
        })

    return (
        <div>
        {
            props.auth.userInfo ?
            <div className="full-order-info">
                <div className="full-order-info__items">
                    <h1 className="full-order-info__items__total">Total price: {data.order_total} {data.currency}</h1> 
                    <h1 className="full-order-info__items__address-main">Billing address :</h1>
                    <p className="full-order-info__items__address">Country: {data.billing_address.country}</p>       
                    <p className="full-order-info__items__address">City: {data.billing_address.city}</p>       
                    <p className="full-order-info__items__address">Address: {data.billing_address.address}</p>       
                    <p className="full-order-info__items__address">Postal code: {data.billing_address.postal}</p>                     
                    <p className="full-order-info__items__delivery">Delivery cost: {data.billing_address.delivery} $</p>    
                    <p className="full-order-info__items__email">Used email address: {data.customer_info.email}</p>  
                    <p className="full-order-info__items__date">Creation date: {data.creation_date}</p>
                </div>
                <div className="full-order-info__products">
                    {allProducts}
                </div>
            </div>
            : null
            }
        </div>
        )    
});