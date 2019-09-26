import React from 'react'

import {connect} from 'react-redux'
import {getUserInfo} from '../../redux/auth'

import './scss/orders.scss'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}


export const Orders = connect(mapStateToProps, {getUserInfo}) ((props) => {
    
    let orders = []


    if(props.auth.userInfo){
        orders = props.auth.userInfo.orders.map((item, index) => {
            return (
                <div className="orders-wrapper__items__each" key={index} onClick={() => {
                    props.setPageState({ page: "fullOrder"})
                    props.setOrder({ id: item._id})
            }}>    
                    <p className="card-title">Order id: {item._id}</p>
                    <p className="card-text">Creation date: {item.creation_date}</p>
                    <p className="card-text">Total price: {item.order_total} {item.currency}</p>
                </div>
            )
        })
    }

    return (
        <div className="orders-wrapper">
            <div className="orders-wrapper__items">
                {orders}
            </div>
        </div>
    )
});