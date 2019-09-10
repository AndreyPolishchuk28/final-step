import React, { useState } from 'react'

import './scss/style.scss'

export const Orders = (props) => {

    const getOrderData = (event) => {
        const id = event.currentTarget.children[0].innerText

        props.history.push(`/account/orders/${id}`)

    }

    const orders = props.orders.map((item, index) => {
        return (
            <div className="orders-wrapper__items__each" key={index} onClick={getOrderData}>    
                <p className="card-title">{item.order_no}</p>
                <p className="card-text">{item.creation_date}</p>
                <p className="card-text">{item.order_total}</p>
                <p className="card-text">{item.currency}</p>     
            </div>
        )
    })

    return (
        <div className="orders-wrapper">
            <div className="orders-wrapper__items">
                {orders}
            </div>
        </div>
    )
};

Orders.defaultProps ={
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