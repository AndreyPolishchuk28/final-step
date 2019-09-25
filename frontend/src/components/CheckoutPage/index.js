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

    const [ userChange, setUserChange] = useState({})

    const [ addressChange, setAddressChange] = useState({})

    const [ payment, setPayment] = useState({payment: ""})

    const [ delivery, setDelivery] = useState({delivery: ""})


    const changeHandler = (event) => {
        setUserChange({
            ...userChange,
            [event.target.id]: event.target.value
        })
        console.log(userChange);
    }

    const addressHandler = (event) => {
        setAddressChange({
            ...addressChange,
            [event.target.id]: event.target.value
        })
        console.log(addressChange);
    }


    const paymentHandler = ((event) => {
        if(event.target.checked){
            setPayment({
                ...payment,
                payment: event.target.parentNode.innerText
            })
            console.log(payment);
        }
    })

    const deliveryHandler = ((event) => {
        if(event.target.checked){
            setDelivery({
                ...delivery,
                delivery: event.target.parentNode.innerText
            })
            console.log(delivery);
        }
    })

    const inputAnimF = (event) => {
        event.target.previousElementSibling.classList.add("active")
    }

    const inputAnimB = (event) => {
        if(!event.target.value){
        event.target.previousElementSibling.classList.remove("active")
        }
    }

    const checkoutInput = (strFor, label, def, changeFunc) => {
        if(def !== "" && def){
            return (
                <div className="checkout-input-wrapper">
                    <label className="checkout-label active" for={strFor}>{label}</label>
                    <input className="checkout-input" type="text" onChange={changeFunc} id={strFor} defaultValue={def} required onFocus={inputAnimF} onBlur={inputAnimB}/>
                </div>
            )
        } else {
            return (
                <div className="checkout-input-wrapper">
                    <label className="checkout-label" for={strFor}>{label}</label>
                    <input className="checkout-input" type="text" onChange={changeFunc} id={strFor} defaultValue={def} required onFocus={inputAnimF} onBlur={inputAnimB}/>
                </div>
            )
        }
    }

    const orderTotal = () => {

        let cost = 0

        props.basket.products.forEach(elem => {
            const eachCost = elem.product.price * elem.quantity
            cost += eachCost
        });

        return cost
    }

    const deliveryCost = () => {
        if(delivery.delivery === "" || delivery.delivery === "Standatd(7 days) FREE" ){return 0}
        if(delivery.delivery === "Next day + 25$" ){return 25}
        if(delivery.delivery === "Two day + 15$" ){return 15}
    }

    const prodViews = props.basket.products.map((elem, index) => {
        const viewBgStyle= {
            backgroundImage: `url('/static/img/${elem.product.photo[0]}')`,
        }
        return (
                <div  className="prod-wrap"  key={index} onClick={(event) => {
                    if(event.target.className === "prod-views"){
                        props.history.push(`/product/${elem.product.id}`)
                    }
                }
                }>
                <div className="prod-views" style={viewBgStyle}

                onMouseOver = {(event) => {
                    if(event.target.className === "prod-views"){
                        event.target.children[0].style.backgroundColor = "blueviolet"}
                }
                }

                onMouseLeave = {(event) => {
                    if(event.target.className === "prod-views"){
                        event.target.children[0].style.backgroundColor = "#8a2be23d"}
                }
                }>

                    <button className="show-close-info-btn" onClick={(event) => {
                        event.target.style.top = "100%"
                        event.target.nextElementSibling.style.top = "-1px"
                    }}>?</button>

                    <div className="prod-info"  
                    onMouseLeave = {(event) => {
                        if(event.target.className === "prod-info"){
                            event.target.style.top = "100%"
                            event.target.previousElementSibling.style.top = "calc(100% - 40px)"
                            event.target.previousElementSibling.style.backgroundColor = "#8a2be23d"
                        }
                    }
                    }
                    >
                        <h1 className="prod-info__name">Name: {elem.product.name}</h1>
                        <h1 className="prod-info__price">{elem.product.price}$</h1>
                        <h1 className="prod-info__quantity">{elem.quantity}x</h1>
                        <h1 className="prod-info__id">id: {elem.product._id}</h1>
                    </div>
                </div>
            </div>
        )
    })



    

    const submitOrder = () => {
        
        if(payment.payment === ""){
            alert("no payment chosen")
        } else if( delivery.delivery === ""){
            alert("no delivery chosen")
        } else {
        const data = {
                creation_date: new Date(Date.now()),
                order_total: orderTotal(),
                currency: "USD",
                customer_info: {
                    first_name: userChange.first_name,
                    last_name: userChange.last_name,
                    email: props.auth.userInfo.email
                },
                billing_address: {
                    country: addressChange.country,
                    city: addressChange.city,
                    address: addressChange.address,
                    postal: addressChange.postal,
                    delivery: delivery.delivery
                },
                payment: {
                    card_type: payment.payment,
                    card_number: userChange.card_number,
                    card_date: userChange.card_date,
                    cvv: userChange.cvv
                },
                product_items: props.basket.products
            }

            props.createOrder(data)
            props.history.push('/')
        }
    }

    useEffect(() => {
        props.getUserInfo();
    }, [])

    useEffect(() => {
        if(props.auth.userInfo){
                setUserChange(props.auth.userInfo)
                setAddressChange(props.auth.userInfo.def_address)
            }
    }, [props.auth.userInfo])

    return (
        props.auth.userInfo ?
        <div  className="checkout-container">
            <form className="checkout-container__inputs" onSubmit={(event) => {event.preventDefault()}}>
                <h1 className="section-header">Payment information</h1>
                <div className="payment-radio-wrap">
                    <h1 className="payment-radio-wrap__header">Choose payment method</h1>
                    <label className="payment-radio-wrap__label">
                        <input type="radio" id="radioButton" name="payment methods" className="payment-radio-wrap__input" onChange={paymentHandler}/>
                        Master Card
                    </label>
                    <label className="payment-radio-wrap__label">
                        <input type="radio" id="radioButton" name="payment methods" className="payment-radio-wrap__input" onChange={paymentHandler}/>
                        Visa
                    </label>
                </div>

                {checkoutInput("card_number", "Card number", "", changeHandler)}
                {checkoutInput("expiration_date", "Expiration date", "", changeHandler)}
                {checkoutInput("email", "CVV", "", changeHandler)}

                <h1 className="section-header">Customer info</h1>
                {checkoutInput("first_name", "First name", userChange.firstName, changeHandler)}
                {checkoutInput("last_name", "Last name", userChange.lastName, changeHandler)}
                {checkoutInput("email", "Email", userChange.email, changeHandler)}
                
                <h1 className="section-header">Address</h1>
                {checkoutInput("country", "Country", addressChange.country, addressHandler)}
                {checkoutInput("city", "City", addressChange.city, addressHandler)}
                {checkoutInput("address", "Address", addressChange.address, addressHandler)}
                {checkoutInput("postal", "Postal code", addressChange.postal, addressHandler)}

                <div className="payment-radio-wrap">
                    <h1 className="payment-radio-wrap__header">Choose delivery period</h1>
                    <label className="payment-radio-wrap__label">
                        <input type="radio" id="radioButton" name="delivery period" className="payment-radio-wrap__input" onChange={deliveryHandler}/>
                        Standatd(7 days) FREE
                    </label>
                    <label className="payment-radio-wrap__label">
                        <input type="radio" id="radioButton" name="delivery period" className="payment-radio-wrap__input" onChange={deliveryHandler}/>
                        Next day + 25$
                    </label>
                    <label className="payment-radio-wrap__label">
                        <input type="radio" id="radioButton" name="delivery period" className="payment-radio-wrap__input" onChange={deliveryHandler}/>
                        Two day + 15$
                    </label>
                </div>

                <button onClick={submitOrder} className="order-submit-btn">Place order</button>
            </form>
            <div className="checkout-container__cart">
                <div className="checkout-container__cart__main">
                    <h1>Your cart</h1>
                </div>
                <div className="checkout-container__cart__products">
                    {prodViews}
                </div>
                <div className="checkout-container__cart__main">
                    <h2>Total cart: {orderTotal()}$</h2>
                    <h2>Deliery: {deliveryCost()}$</h2>
                    <h2>Total: {orderTotal() + deliveryCost()}$</h2>
                </div>
            </div>
        </div>
        : null
    )
});