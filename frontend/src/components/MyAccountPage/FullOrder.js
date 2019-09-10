import React from 'react'

import './scss/style.scss'

export const FullOrder = (props) => {
    
    const dataArr = props.orders.filter(item => props.location.pathname === `/account/orders/${item.order_no}`)
    
    const data = dataArr[0]
    
    const addressValues = Object.values(data.billing_address)

    const address= addressValues.map((item, index) => {
        return <p className="card-text" key={"add" + index}>{item}</p>
    })

    const products = data.product_items.map((item, index) => {
        const oneOrder = Object.values(item)
        const allOrders = oneOrder.map((item, index) => {
             return <p className="card-text" key={"ord" + index}>{item}</p>
        })

        return (
            <div className="full-order-info__products__items" key={index}>
                {allOrders}
            </div>) 
        })

    return (
        <div className="full-order-info">
            <div className="full-order-info__text">
                <p className="card-title">{data.order_no}</p>
                <p className="card-text">{data.creation_date}</p>
                <p className="card-text">{data.order_total}</p>
                <p className="card-text">{data.currency}</p> 
                <p className="card-text">{address}</p>       
                <p className="card-text">{data.customer_info.customer_no}</p>    
                <p className="card-text">{data.customer_info.email}</p>  
            </div>
            <div className="full-order-info__products">{products}</div>   
        </div>
        )    
}
 
FullOrder.defaultProps ={
    orders : [
        {
            order_no: "00000101",
            creation_date: "2018-09-06T13:36Z",
            order_total: 16.50,
            currency: "USD",
            billing_address : {
                city: "Boston",
                country_code: "US",
                first_name: "Ivan",
                full_name: "Ivan Bohatov",
                last_name: "Bohatov"
            },
            customer_info: {
                customer_no: "iBohatov5",
                email: "ibohatov@mail.com",
            },
            product_items: [
                {
                price: 16.50,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.00,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.57,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.46,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            }
            ]
        },
        {
            order_no: "00000102",
            creation_date: "2018-09-06T13:36Z",
            order_total: 16.54,
            currency: "USD",
            billing_address : {
                city: "Boston",
                country_code: "US",
                first_name: "Ivan",
                full_name: "Ivan Bohsdsdatov",
                last_name: "Bohatov"
            },
            customer_info: {
                customer_no: "iBohatov5",
                email: "ibohatov@mail.com",
            },
            product_items: [
                {
                price: 16.50,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.00,
                product_id: "SimpleProduct",
                product_name: "SimplePsdsdroduct",
                quantity: 1.00
            },
            {
                price: 16.57,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.46,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.46,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            }
            ]
        },
        {
            order_no: "00000103",
            creation_date: "2018-09-06T13:36Z",
            order_total: 16.34,
            currency: "USD",
            billing_address : {
                city: "Boston",
                country_code: "US",
                first_name: "Ivan",
                full_name: "Ivan Bohatov",
                last_name: "Bohatov"
            },
            customer_info: {
                customer_no: "iBohatov5",
                email: "ibohatov@mail.com",
            },
            product_items: [
                {
                price: 16.50,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.00,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.57,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            },
            {
                price: 16.46,
                product_id: "SimpleProduct",
                product_name: "SimpleProduct",
                quantity: 1.00
            }
            ]
        }
     ]
 }