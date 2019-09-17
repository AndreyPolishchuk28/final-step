import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux'
import {getUserInfo} from '../../redux/auth'
import {createOrder} from '../../redux/basket'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const CheckoutPage = connect(mapStateToProps, {getUserInfo, createOrder})((props) => {
    useEffect(() => {
        props.getUserInfo();
    }, [])

    console.log(props);

    const [ userChange, setUserChange] = useState({
        ...props.auth.userInfo
    })
    
    const changeHandler = (event) => {
        setUserChange({
            ...userChange,
            [event.target.name]: event.target.value
        })
    }


    const orderTotal = () => {

        let cost = 0

        props.basket.products.forEach(elem => {
            const eachCost = elem.product.price * elem.quantity
            cost += eachCost
        });

        return cost
    }

    const submitOrder = async () => {
        const data = await {
                creation_date: new Date(Date.now()),
                order_total: orderTotal(),
                currency: "USD",
                customer_info: {
                    first_name: userChange.first_name,
                    last_name: userChange.last_name,
                    email: props.auth.userInfo.email
                },
                billing_address: {
                    country: "",
                    city: "addChange.city",
                    address: "addChange.address"
                },
                product_items: props.basket
            }

        console.log(data);

        props.createOrder(data)

        props.history.push('/')
    }


    return (
        props.auth.userInfo ?
        <div className="container-change">
            <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.auth.userInfo.first_name} placeholder="First name" name="first_name"/>
            <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.auth.userInfo.last_name} placeholder="Last name" name="last_name"/>
            <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.auth.userInfo.email} placeholder="email" name="email"/>
            <h1>Address</h1>
            <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.auth.userInfo.def_address.country} placeholder="country" name="country"/>
            <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.auth.userInfo.def_address.city} placeholder="city" name="city"/>
            <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.auth.userInfo.def_address.address} placeholder="address" name="address"/>
            <button onClick={submitOrder}>Submit order</button>
        </div>
        : null
    )
});