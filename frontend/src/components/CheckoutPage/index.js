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

    const [err, setErr] = useState({});

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

    function validate(userChange, addressChange, payment, delivery) {
        let errors = {};

        if(userChange.firstName === "" || !userChange.firstName){
            errors.firstNameReq = 'First name is required'
        }
        if(userChange.lastName === "" || !userChange.lastName){
            errors.lastNameReq = 'Last name is required'
        }
        if (userChange.email === "" || !userChange.email){
            errors.emailReq = 'Email address is required'
        }else if (!/\S+@\S+\.\S+/.test(userChange.email)){
            errors.emailInvalid = "Email address is invalid";
        }

        if(!userChange.card_number){
            errors.cardNumbReq = 'Card number is required'
        } else if (userChange.card_number.length < 16 || isNaN(userChange.card_number)){
            errors.cardNumbInvalid = "Card number is invalid";
        }

        if(!userChange.expiration_date){
            errors.expDateReq = 'Expiriation date is required'
        } else if (userChange.expiration_date.length < 4 || isNaN(userChange.expiration_date)){
            errors.expDateInvalid = "Expiration date is invalid";
        }

        if (!userChange.cvv){
            errors.cvvReq = 'CVV is required'
        }  else if (userChange.cvv.length < 3 || isNaN(userChange.cvv)){
            errors.cvvInvalid = "CVV is invalid";
        }

        if (payment.payment === ""){
            errors.paymentReq = 'Payment is required'
        }

        if (delivery.delivery === ""){
            errors.deliveryReq = 'Delivery is required'
        }

        if(addressChange.country === "" || !addressChange.country){
            errors.countryReq = 'Country is required'
        }
        if(addressChange.city === "" || !addressChange.city){
            errors.cityReq = 'City is required'
        }
        if(addressChange.address === "" || !addressChange.address){
            errors.addressReq = 'Address is required'
        }

        if(addressChange.postal === "" || !addressChange.postal){
            errors.postalReq = 'Postal code is required'
        } else if (isNaN(addressChange.postal)){
            errors.postalInvalid = "Postal code is invalid";
        }

        console.log(errors);

        return errors
    }


    const inputAnimF = (event) => {
        event.target.previousElementSibling.classList.add("active")
    }

    const inputAnimB = (event) => {
        if(!event.target.value){
        event.target.previousElementSibling.classList.remove("active")
        }
    }

    const checkoutInput = (strFor, label, def, changeFunc, error) => {
        if(def !== "" && def){
            return (
                <div className="checkout-input-wrapper">
                    <label className="checkout-label active" for={strFor}>{label}</label>
                    <input className="checkout-input" type="text" onChange={changeFunc} id={strFor} defaultValue={def} required onFocus={inputAnimF} onBlur={inputAnimB}/>
                    {error ? <p className='error'>{error}</p> : null}
                </div>
            )
        } else {
            return (
                <div className="checkout-input-wrapper">
                    <label className="checkout-label" for={strFor}>{label}</label>
                    <input className="checkout-input" type="text" onChange={changeFunc} id={strFor} defaultValue={def} required onFocus={inputAnimF} onBlur={inputAnimB}/>
                    {error ? <p className='error'>{error}</p> : null}
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
                        <h1 className="prod-info__name">Model: <span>{elem.product.name}</span></h1>
                        <h1 className="prod-info__price">Price for one: <span>{elem.product.price}$</span></h1>
                        <h1 className="prod-info__quantity">Quantity in cart: <span>{elem.quantity}x</span></h1>
                    </div>
                </div>
            </div>
        )
    })



    

    const submitOrder = () => {

        let errors = validate(userChange, addressChange, payment, delivery)
        
        if (Object.keys(errors).length){
            console.log("kek");
            setErr(validate(userChange, addressChange, payment, delivery))
        } else {
        const data = {
                creation_date: new Date(Date.now()),
                order_total: orderTotal(),
                currency: "USD",
                customer_info: {
                    firstName: userChange.firstName,
                    lastName: userChange.lastName,
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
                console.log(props);
            if(props.auth.userInfo.def_address){
                setAddressChange(props.auth.userInfo.def_address)
            }
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
                {err.paymentReq ? <p className='error'>{err.paymentReq}</p> : null}

                {checkoutInput("card_number", "Card number", "", changeHandler, err.cardNumbReq)}
                {err.cardNumbInvalid ? <p className='error'>{err.cardNumbInvalid}</p> : null}
                {checkoutInput("expiration_date", "Expiration date", "", changeHandler, err.expDateReq)}
                {err.expDateInvalid ? <p className='error'>{err.expDateInvalid}</p> : null}
                {checkoutInput("cvv", "CVV", "", changeHandler, err.cvvReq)}
                {err.cvvInvalid ? <p className='error'>{err.cvvInvalid}</p> : null}

                <h1 className="section-header">Customer info</h1>
                {checkoutInput("firstName", "First name", userChange.firstName, changeHandler, err.firstNameReq)}
                {checkoutInput("lastName", "Last name", userChange.lastName, changeHandler, err.lastNameReq)}
                {checkoutInput("email", "Email", userChange.email, changeHandler, err.emailReq)}
                {err.emailInvalid ? <p className='error'>{err.emailInvalid}</p> : null}
                
                <h1 className="section-header">Address</h1>
                {checkoutInput("country", "Country", addressChange.country, addressHandler, err.countryReq)}
                {checkoutInput("city", "City", addressChange.city, addressHandler, err.cityReq)}
                {checkoutInput("address", "Address", addressChange.address, addressHandler, err.addressReq)}
                {checkoutInput("postal", "Postal code", addressChange.postal, addressHandler, err.postalReq)}
                {err.postalInvalid ? <p className='error'>{err.postalInvalid}</p> : null}

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
                {err.deliveryReq ? <p className='error'>{err.deliveryReq}</p> : null}

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
                    <div className="total-costs"><span>Total cart:</span><span>{orderTotal()}$</span></div>
                    <div className="total-costs"><span>Deliery:</span><span>{deliveryCost()}$</span></div>
                    <div className="total-costs--fin"><span>Total:</span><span>{orderTotal() + deliveryCost()}$</span></div>
                </div>
            </div>
        </div>
        : null
    )
});