import React from 'react'

import './scss/style.scss'

export const CheckoutInput = (props) => {
    const inputAnimF = (event) => {
        event.target.previousElementSibling.classList.add("active-input")
    }

    const inputAnimB = (event) => {
        if(!event.target.value){
        event.target.previousElementSibling.classList.remove("active-input")
        }
    }

    
    return (
        <div className="checkout-input-wrapper">
            <label className={props.value ? "checkout-label active-input" : "checkout-label"} htmlFor={props.strFor}>{props.label}</label>
            <input className="checkout-input" type="text" onChange={props.changeFunc} id={props.strFor} value={props.value} required onFocus={inputAnimF} onBlur={inputAnimB}/>
            {!props.value && !props.valid.status ? <p className="err-cust">*</p> : null}
        </div>
    )
}