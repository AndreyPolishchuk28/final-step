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
        </div>
        : null
    )
});