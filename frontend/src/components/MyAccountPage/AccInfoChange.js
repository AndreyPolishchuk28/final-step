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
            errors.firstNameReq = 'First name is required'
        }
        if(userChange.last_name === ""){
            errors.lastNameReq = 'Last name is required'
        }

        return errors
    }

    const changeInput = (strFor, label, def, changeFunc, error) => {
        return (
            <div className="change-input-wrapper">
                <Input size="large" placeholder={label} onChange={changeFunc} id={strFor} defaultValue={def}/>
                {error ? <p className='error'>{error}</p> : null}
            </div>
        )
    }
    

    const submitHandler = async () => {
        let errors = validate(userChange)
        
        if (Object.keys(errors).length){
            setErr(validate(userChange))
            message.error('Not all fields are correct');
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
            <div className="close-btn">
                <Icon type="close-circle" style={{color: "red"}} onClick={() => {props.setPageState({ page: "info"})}}></Icon>
            </div>
            <h1 className="info-header">Main information</h1>
            {changeInput("first_name", "First name", userChange.firstName, changeHandler, err.firstNameReq)}
            {changeInput("last_name", "Last name", userChange.lastName, changeHandler, err.lastNameReq)}

            <Button style={{width: "150px", display: "block"}} type="Deafault" onClick={() => {props.setPageState({ page: "changePassword"})}}>change password</Button>

            <h1 className="info-header">Additional information</h1>
            {changeInput("country", "Country", addChange.country, changeAdditionalHandler)}
            {changeInput("city", "City", addChange.city, changeAdditionalHandler)}
            {changeInput("address", "Address", addChange.address, changeAdditionalHandler)}
            {changeInput("postal", "Postal code", addChange.postal, changeAdditionalHandler)}
            <div style={{width : "500px"}}>
                <Button block size="large" type="primary" onClick={submitHandler}>Submit</Button>
            </div>
        </div>
        : null 
    )
});