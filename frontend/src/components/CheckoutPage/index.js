import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux'
import {getUserInfo} from '../../redux/auth'
import {createOrder} from '../../redux/basket'

import './scss/style.scss'

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

    console.log(props.auth.loginStatus);

    const [ userChange, setUserChange] = useState(() => {
        if(props.auth.loginStatus){
            return {...props.auth.userInfo}
        }else if(!props.auth.loginStatus){
            return {
                def_address: {}
            }
        }
    })

    console.log(userChange);
    
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

    const prodViews = props.basket.products.map((elem, index) => {
        const viewBgStyle= {
            backgroundImage: `url('/static/img/${elem.product.photo[0]}')`,
        }
        return (
            <div className="prod-views" style={viewBgStyle} key={index}>
                <button className="show-close-info-btn" onClick={(event) => {
                    event.target.style.top = "100%"
                    event.target.nextElementSibling.style.top = 0
                }}>?</button>
                <div className="prod-info"  onMouseLeave={(event) => {
                    if(event.target.className === "prod-info"){
                        event.target.style.top = "100%"
                        event.target.previousElementSibling.style.top = "calc(100% - 40px)"}
                }
                }>
                    <h1 className="prod-info__name">Name: {elem.product.name}</h1>
                    <p className="prod-info__brand">Brand: {elem.product.producer}</p>
                    <p className="prod-info__category">Category: {elem.product.category}</p>
                    <h1 className="prod-info__price">{elem.product.price}$</h1>
                    <h1 className="prod-info__quantity">{elem.quantity}x</h1>
                    <h1 className="prod-info__id">id: {elem.product._id}</h1>
                </div>
            </div>
        )
    })

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
                payment: {
                    card_number: userChange.card_number,
                    card_date: userChange.card_date,
                    cvv: userChange.cvv
                },
                product_items: props.basket
            }

        console.log(data);

        await props.createOrder(data)

        props.history.push('/')
    }


    return (
        props.auth.userInfo ?
        <div  className="checkout-container">
            <div className="checkout-container__inputs">
                <h1 className="section-header">Payment information</h1>
                <input className="checkout-input" type="text" onChange={changeHandler} placeholder="Card type" name="card_type"/>
                <input className="checkout-input" type="text" onChange={changeHandler} placeholder="Card number" name="card_number"/>
                <input className="checkout-input" type="text" onChange={changeHandler} placeholder="Card date" name="card_date"/>
                <input className="checkout-input" type="text" onChange={changeHandler} placeholder="CVV" name="cvv"/>
                <h1 className="section-header">Customer info</h1>
                <input className="checkout-input" type="text" onChange={changeHandler} defaultValue={userChange.firstName} placeholder="First name" name="first_name"/>
                <input className="checkout-input" type="text" onChange={changeHandler} defaultValue={userChange.lastName} placeholder="Last name" name="last_name"/>
                <input className="checkout-input" type="text" onChange={changeHandler} defaultValue={userChange.email} placeholder="email" name="email"/>
                <h1 className="section-header">Address</h1>
                <input className="checkout-input" type="text" onChange={changeHandler} defaultValue={userChange.def_address.country} placeholder="country" name="country"/>
                <input className="checkout-input" type="text" onChange={changeHandler} defaultValue={userChange.def_address.city} placeholder="city" name="city"/>
                <input className="checkout-input" type="text" onChange={changeHandler} defaultValue={userChange.def_address.address} placeholder="address" name="address"/>
                <button onClick={submitOrder} className="order-submit-btn">Place order</button>
            </div>
            <div className="checkout-container__cart">
                <div className="checkout-container__cart__main">
                    <div className="text-wrap">
                        <h1>Your cart</h1>
                        <h2>Total: {orderTotal()}$</h2>
                    </div>
                </div>
                <div className="checkout-container__cart__products">
                    {prodViews}
                </div>
            </div>
        </div>
        : null
    )
});