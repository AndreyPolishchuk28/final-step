import React from 'react'

import {connect} from 'react-redux'
import {getUserInfo} from '../../redux/auth'

import './scss/orders.scss'
import {Card, Descriptions, Empty, Button} from "antd"

const mapStateToProps = (state) => {
    return {
        ...state
    }
}


export const Orders = connect(mapStateToProps, {getUserInfo}) ((props) => {
    
    let orders = []


    if(props.auth.userInfo){
        orders = props.auth.userInfo.orders.map((item) => {
            return (
                <Card size="small" title={`Order: ${item._id}`} 
                extra={<a href="#" 
                onClick={() => {
                    props.setPageState({ page: "fullOrder"})
                    props.setOrder({ id: item._id})
                }}>More</a>} 
                style={{ 
                    width: 300,
                    margin: 5
                }}> 
                    <Descriptions column={1}>
                        <Descriptions.Item label="Creation date">{item.creation_date}</Descriptions.Item>
                        <Descriptions.Item label="Total price">{item.order_total} {item.currency}</Descriptions.Item>
                    </Descriptions>
                </Card>
            )
        })
    }

    return (
        props.auth.userInfo.orders.length ?
        <div className="orders-wrapper">
                {orders}
        </div>
        :
        <div class="no-user-div">
        <Empty
                imageStyle={{
                height: 300,
                width: 100+"%"
                }}
                description={
                <span> There are no orders  on this account</span>
                }
            >
                <Button type="primary" onClick={() => {props.history.push('/')}}>Make your first order</Button>
            </Empty>
        </div>
    )
});