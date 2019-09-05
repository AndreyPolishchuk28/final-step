import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import './scss/style.scss'

export const FullOrder = (props) => {

                    const data = props.data

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
