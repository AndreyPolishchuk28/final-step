import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux'
import {getUserInfo} from '../../redux/auth'
import {createOrder} from '../../redux/basket'
import {CheckoutInput} from './Input'
import {Cart} from './Cart'

import './scss/style.scss'
import {message, Empty, Button} from 'antd'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const CheckoutPage = connect(mapStateToProps, {getUserInfo, createOrder})((props) => {

    const [ userChange, setUserChange] = useState({})

    const [ addressChange, setAddressChange] = useState({})

    const [ radioOpt, setRadioOpt] = useState({
        payment: "",
        delivery: ""
    })

    const [ validState, setValidState] = useState({status: true})

    const [err, setErr] = useState({});

    const changeHandler = (event) => {
        setUserChange({
            ...userChange,
            [event.target.id]: event.target.value
        })
    }

    const addressHandler = (event) => {
        setAddressChange({
            ...addressChange,
            [event.target.id]: event.target.value
        })
    }


    const radioHandler = ((event) => {
        if(event.target.checked){
            setRadioOpt({
                ...radioOpt,
                [event.target.name]: event.target.value
            })
        }
    })

    function validate() {
        let errors = {};

        Object.values(radioOpt).forEach((key) =>  {
            if(!key){
                errors.empty = "true"
            }
        })

        if (!/\S+@\S+\.\S+/.test(userChange.email)){
            errors.emailInvalid = "Email address is invalid";
        }

        if (isNaN(addressChange.postal)){
            errors.postalInvalid = "Postal code is invalid";
        }

        return errors
    }

    const orderTotal = () => {
        let cost = 0

        props.basket.products.forEach(elem => {
            const eachCost = elem.product.price * elem.quantity
            cost += eachCost
        });

        return cost
    }

    const submitOrder = () => {

        let validateInfo = true
        let validateAddress = true

        const data = {
            creation_date: new Date(Date.now()),
            order_total: orderTotal(),
            currency: "USD",
            customer_info: {
                firstName: userChange.firstName,
                lastName: userChange.lastName,
                email: userChange.email
            },
            billing_address: {
                country: addressChange.country,
                city: addressChange.city,
                address: addressChange.address,
                postal: addressChange.postal,
                delivery: radioOpt.delivery
            },
            product_items: props.basket.products
        }

        validateInfo = Object.values(data.customer_info).every((elem) => elem )

        validateAddress = Object.values(data.billing_address).every((elem) => elem )

        let errors = validate()

        if (!Object.keys(errors).length && validateInfo && validateAddress){
            alert("norm")
            props.createOrder(data)
            props.history.push("/")
            message.success('Your order succeed', 10)
        } else {
            setErr(validate())
            setValidState({status: false})
            message.error('Not all ... are filled', 10)
            console.log(props);
        }
    }

    useEffect(() => {
        props.getUserInfo();
    }, [])

    useEffect(() => {
        if(props.auth.userInfo){
                setUserChange(props.auth.userInfo)
            if(props.auth.userInfo.def_address){
                setAddressChange(props.auth.userInfo.def_address)
                console.log(addressChange);
            }
            }
    }, [props.auth.userInfo])

    return (
        props.basket.products.length ?
        props.auth.userInfo ?
        <div  className="checkout-container">
            <form className="checkout-container__inputs" onSubmit={(event) => {event.preventDefault()}}>

                <h1 className="section-header">Customer info</h1>
                <CheckoutInput valid={validState} strFor="firstName" label="First name" value={userChange.firstName} changeFunc={changeHandler}/>
                <CheckoutInput valid={validState} strFor="lastName" label="Last name" value={userChange.lastName} changeFunc={changeHandler}/>
                <CheckoutInput valid={validState} strFor="email" label="Email" value={userChange.email} changeFunc={changeHandler}/>
                {err.emailInvalid ? <p className='error'>{err.emailInvalid}</p> : null}
                
                <h1 className="section-header">Address</h1>
                <CheckoutInput valid={validState} strFor="country" label="Country" value={addressChange.country} changeFunc={addressHandler}/>
                <CheckoutInput valid={validState} strFor="city" label="City" value={addressChange.city} changeFunc={addressHandler}/>
                <CheckoutInput valid={validState} strFor="address" label="Address" value={addressChange.address} changeFunc={addressHandler}/>
                <CheckoutInput valid={validState} strFor="postal" label="Postal code" value={addressChange.postal} changeFunc={addressHandler}/>
                {err.postalInvalid ? <p className='error'>{err.postalInvalid}</p> : null}

                <div className="payment-radio-wrap">
                    <h1 className="payment-radio-wrap__header">Choose delivery period</h1>
                    <label className="payment-radio-wrap__label">
                        <input type='radio' value="0" id="radioButton" name="delivery" className="payment-radio-wrap__input" onChange={radioHandler}/>
                        Standatd(7 days) FREE
                    </label>
                    <label className="payment-radio-wrap__label">
                        <input type='radio' value="25" id="radioButton" name="delivery" className="payment-radio-wrap__input" onChange={radioHandler}/>
                        Next day + 25$
                    </label>
                    <label className="payment-radio-wrap__label">
                        <input type='radio' value="15" id="radioButton" name="delivery" className="payment-radio-wrap__input" onChange={radioHandler}/>
                        Two day + 15$
                    </label>
                </div>
                {!radioOpt.delivery && !validState.status ? <p className='err-cust'>Delivery is required</p> : null}

                <h1 className="section-header">Payment information</h1>
                <div className="payment-radio-wrap">
                    <h1 className="payment-radio-wrap__header">Choose payment method</h1>
                    <label className="payment-radio-wrap__label">
                        <input value="Master Card" type="radio" id="radioButton" name="payment" className="payment-radio-wrap__input" onChange={radioHandler}/>
                        Master Card
                    </label>
                    <label className="payment-radio-wrap__label">
                        <input value="Visa" type="radio" id="radioButton" name="payment" className="payment-radio-wrap__input" onChange={radioHandler}/>
                        Visa
                    </label>
                    <label className="payment-radio-wrap__label">
                        <input value="PayPal" type="radio" id="radioButton" name="payment" className="payment-radio-wrap__input" onChange={radioHandler}/>
                        PayPal
                    </label>
                    <label className="payment-radio-wrap__label">
                        <input value="onArrive" type="radio" id="radioButton" name="payment" className="payment-radio-wrap__input" onChange={radioHandler}/>
                        On product's arriving
                    </label>
                </div>
                {!radioOpt.payment && !validState.status ? <p className='err-cust'>Payment is required</p> : null}

                <span onClick={submitOrder} className="order-submit-btn">Place order</span>
            </form>
            <div className="checkout-container__cart">
                <h1 className="checkout-container__cart__header">Your cart</h1>
                <div className="checkout-container__cart__products">
                    <Cart info={props.basket.products} history={props.history}/>
                </div>
                <div className="checkout-container__cart__main">
                    <div className="total-costs"><span>Total cart:</span><span>{orderTotal()}$</span></div>
                    <div className="total-costs"><span>Deliery:</span><span>{+radioOpt.delivery}$</span></div>
                    <div className="total-costs--fin"><span>Total:</span><span>{orderTotal() + +radioOpt.delivery}$</span></div>
                </div>
            </div>
        </div>
        : null
        : 
        <div class="no-basket-div">
        <Empty
                imageStyle={{
                height: 300,
                width: 100+"%"
                }}
                description={
                <span> There are no products in your cart</span>
                }
            >
                <Button type="primary" onClick={() => {props.history.push('/')}}>Go shopping</Button>
            </Empty>
        </div>
    )
});