import React, { useState } from 'react'
import {FullOrder} from './FullOrder'
import {Link} from 'react-router-dom';

import './scss/style.scss'

export const Orders = (props) => {

    const [ pageState, setPageState] = useState(true)

    const changePage = () => {
        setPageState(!pageState)
    }

    const [orderData, setOrderData] = useState(props.orders[0])

    const getOrderData = (event) => {
        const id = event.currentTarget.children[0].children[0].innerText
            
        props.orders.forEach( item => {
             if(item.order_no === id){  
                console.log(item);
                setOrderData(item)
                }
        })
        changePage()
    }

    const orders = props.orders.map((item, index) => {
        return (
            <div className="orders-wrapper__items__each" key={index} onClick={getOrderData}>
                <div className="card-body">
                    <p className="card-title">{item.order_no}</p>
                    <p className="card-text">{item.creation_date}</p>
                    <p className="card-text">{item.order_total}</p>
                    <p className="card-text">{item.currency}</p>     
                </div>
            </div>
        )
    })

    const showPage = () => {
        if(!pageState) {
            return (
                    <div className="full-order-wrapper">
                        <FullOrder data = {orderData}/>
                        <button className={"button-history"} size="large" type="default"  onClick={changePage}><i class="fas fa-clipboard-list"></i>Go to history</button>
                    </div>
                
                )
            }
        return (
                        <div className="orders-wrapper">
                            <div className="orders-wrapper__items">
                                {orders}
                            </div>
                            <Link exact to="/account">
                                <button className={"button-history"} size="large" type="default"  onClick={changePage}><i class="far fa-id-card"></i>Go to account</button>
                            </Link>
                        </div>
            )
    }

    return showPage()
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
        },
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

    ]
}