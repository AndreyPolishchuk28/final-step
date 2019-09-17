import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux'
import {getUserInfo} from '../../redux/auth'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const CheckoutPage = connect(mapStateToProps, {getUserInfo}) ((props) => {
    useEffect(() => {
        props.getUserInfo();
    }, [])

    const [ userChange, setUserChange] = useState({
        ...props.auth.userInfo
    })
    
    const changeHandler = (event) => {
        setUserChange({
            ...userChange,
            [event.target.name]: event.target.value
        })
    }


    return (
        props.auth.userInfo ?
        <div className="container-change">
            <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.auth.userInfo.first_name} placeholder="First name" name="first_name"/>
            <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.auth.userInfo.last_name} placeholder="Last name" name="last_name"/>
            <h1>Address</h1>
            <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.auth.userInfo.def_address.country} placeholder="country" name="country"/>
            <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.auth.userInfo.def_address.city} placeholder="city" name="city"/>
            <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.auth.userInfo.def_address.address} placeholder="address" name="address"/>
        </div>
        : null
    )
});