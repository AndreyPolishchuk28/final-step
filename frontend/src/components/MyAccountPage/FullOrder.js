import React, {useEffect} from 'react'

import {connect} from 'react-redux'
import {getUserInfo} from '../../redux/auth'

import './scss/style.scss'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const FullOrder = connect(mapStateToProps, {getUserInfo})((props) => {
    let dataArr = []

    let data =  {billing_address:""}

    let allOrders = []

    let products = []

    console.log(props);

    if(props.auth.userInfo){
        dataArr = props.auth.userInfo.orders.filter(item => props.match.params.id === item._id)
        
        console.log(dataArr);

        data = dataArr[0];

        console.log(data);

        allOrders = data.product_items.map((item, index) => {
                return (
                    <div className="full-order-info__products__items"  key={index}>
                        <h1 className="full-order-info__products__text">{item.product.name}</h1>
                        <h1 className="full-order-info__products__text">{item.product.producer}</h1>
                        <h1 className="full-order-info__products__text">{item.product.category}</h1>
                        <h1 className="full-order-info__products__text">{item.product.price}</h1>
                        <h1 className="full-order-info__products__text">{item.product._id}</h1>
                    </div>
                    )
            })
    }

    useEffect(() => {
        props.getUserInfo();
    }, [])

    return (
        <div>
        {
            props.auth.userInfo ?
            <div className="full-order-info">
                <div className="full-order-info__items">
                    <p>{data.order_no}</p>
                    <p>{data.creation_date}</p>
                    <p>{data.order_total} {data.currency}</p> 
                    <h1>Billing address</h1>
                    <p>Country: {data.billing_address.country}</p>       
                    <p>City: {data.billing_address.city}</p>       
                    <p>Address: {data.billing_address.address}</p>       
                    <p>Postal: {data.billing_address.postal}</p>  
                    <p>Orders delivery type: {data.billing_address.delivery}</p>    
                    <p>{data.customer_info.email}</p>  
                </div>
                <div className="full-order-info__products">
                    {allOrders}
                </div>
            </div>
            : null
            }
        </div>
        )    
});