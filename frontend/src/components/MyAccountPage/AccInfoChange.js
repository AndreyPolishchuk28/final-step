import React, {useState} from 'react'

import {connect} from 'react-redux'
import {changeUserInfo} from '../../redux/auth'

import './scss/change.scss'
import {Button, Icon, Input, message} from 'antd'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const AccInfoChange = connect(mapStateToProps, {changeUserInfo}) ((props) => {

    const [ userChange, setUserChange] = useState({
        ...props.auth.userInfo
    })

    const [ addChange, setAddChange] = useState({
        ...props.auth.userInfo.def_address
    })

    const [err, setErr] = useState({});
    
    const changeHandler = (event) => {
        setUserChange({
            ...userChange,
            [event.target.id]: event.target.value
        })
    }

    const changeAdditionalHandler = (event) => {
        setAddChange({
            ...addChange,
            [event.target.id]: event.target.value 
        })
    }

    function validate(userChange) {
        let errors = {};

        if(userChange.first_name === ""){
            errors.firstNameReq = '*'
        }
        if(userChange.last_name === ""){
            errors.lastNameReq = '*'
        }

        return errors
    }

    const changeInput = (strFor, label, def, changeFunc, error) => {
        return (
            <div className="change-input-wrapper">
                <Input size="large" placeholder={label} onChange={changeFunc} id={strFor} defaultValue={def}/>
                {error ? <p className='err-change'>{error}</p> : null}
            </div>
        )
    }
    

    const submitHandler = async () => {
        let errors = validate(userChange)
        
        if (Object.keys(errors).length){
            setErr(validate(userChange))
            message.error('Not all fields are correct', 5);
        } else {
            const data = await {
                firstName: userChange.firstName,
                lastName: userChange.lastName,
                email: props.auth.userInfo.email,
                def_address: {
                    country: addChange.country,
                    city: addChange.city,
                    address: addChange.address,
                    postal: addChange.postal
                }
            }
            
            props.changeUserInfo(data)

            props.setPageState({ page: "info"})

            message.success('Your personal info have changed!');
        }
    }
  
    return ( props.auth.userInfo ?
        <div className="container-change">
            <h1 className="change-header">Main information</h1>
            {changeInput("first_name", "First name", userChange.firstName, changeHandler, err.firstNameReq)}
            {changeInput("last_name", "Last name", userChange.lastName, changeHandler, err.lastNameReq)}
            <div class="basic-btn-change-wrap">
                <button  onClick={() => {props.setPageState({ page: "changePassword"})}} className="basic-btn-change">change password</button>
            </div>
            <h1 className="change-header">Additional information</h1>
            {changeInput("country", "Country", addChange.country, changeAdditionalHandler)}
            {changeInput("city", "City", addChange.city, changeAdditionalHandler)}
            {changeInput("address", "Address", addChange.address, changeAdditionalHandler)}
            {changeInput("postal", "Postal code", addChange.postal, changeAdditionalHandler)}
            <div class="basic-btn-change-wrap">
                <button onClick={submitHandler} className="basic-btn-change">Submit</button>
                <button onClick={() => {props.setPageState({ page: "info"})}} className="basic-btn-change">Go back</button>
            </div>
        </div>
        : null 
    )
});