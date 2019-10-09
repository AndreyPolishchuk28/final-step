import React from 'react'

import {connect} from 'react-redux'
import {getUserInfo} from '../../redux/auth'

import './scss/orders.scss'
import {Card} from "antd"

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
                <Card size="small" title={"Order"} 
                extra={<a href="#" 
                onClick={() => {
                    props.setPageState({ page: "fullOrder"})
                    props.setOrder({ id: item._id})
                }}>More</a>} 
                style={{ 
                    width: 300,
                    marginBottom: 10 
                }}> 
                    <p className="card-title">Order id: {item._id}</p>
                    <p className="card-text">Creation date: {item.creation_date}</p>
                    <p className="card-text">Total price: {item.order_total} {item.currency}</p>  
                </Card>
            )
        })
    }

    return (
        <div className="orders-wrapper">
                {orders}
        </div>
    )
});