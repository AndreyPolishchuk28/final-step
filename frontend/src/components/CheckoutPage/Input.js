import React from 'react'

import './scss/style.scss'

export const CheckoutInput = (props) => {
    const inputAnimF = (event) => {
        event.target.previousElementSibling.classList.add("active")
    }

    const inputAnimB = (event) => {
        if(!event.target.value){
        event.target.previousElementSibling.classList.remove("active")
        }
    }

    
    return (
        <div className="checkout-input-wrapper">
            <label className={props.value ? "checkout-label active" : "checkout-label"} htmlFor={props.strFor}>{props.label}</label>
            <input className="checkout-input" type="text" onChange={props.changeFunc} id={props.strFor} value={props.value} required onFocus={inputAnimF} onBlur={inputAnimB}/>
            {!props.value ? <p className="err-cust">Field is required</p> : null}
        </div>
    )
}