import React, {useState} from 'react'
import {Button} from 'antd'

import {connect} from 'react-redux'
import {changeUserInfo} from '../../redux/auth'

import './scss/change.scss'

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
        console.log(addChange);
    }

    function validate(userChange) {
        let errors = {};

        if(userChange.first_name === ""){
            errors.firstNameReq = 'First name is required'
        }
        if(userChange.last_name === ""){
            errors.lastNameReq = 'Last name is required'
        }

        console.log(errors);

        return errors
    }


    const inputAnimF = (event) => {
        event.target.previousElementSibling.classList.add("change-label-active")
    }

    const inputAnimB = (event) => {
        if(!event.target.value){
        event.target.previousElementSibling.classList.remove("change-label-active")
        }
    }

    const changeInput = (strFor, label, def, changeFunc, error) => {
        if(def !== "" && def){
            return (
                <div className="change-input-wrapper">
                    <label className="change-label change-label-active" for={strFor}>{label}</label>
                    <input className="input-change" type="text" onChange={changeFunc} id={strFor} defaultValue={def} onFocus={inputAnimF} onBlur={inputAnimB}/>
                    {error ? <p className='error'>{error}</p> : null}
                </div>
            )
        } else {
            return (
                <div className="change-input-wrapper">
                    <label className="change-label" for={strFor}>{label}</label>
                    <input className="input-change" type="text" onChange={changeFunc} id={strFor} defaultValue={def} onFocus={inputAnimF} onBlur={inputAnimB}/>
                    {error ? <p className='error'>{error}</p> : null}
                </div>
            )
        }
    }
    

    const submitHandler = async () => {
        let errors = validate(userChange)
        
        if (Object.keys(errors).length){
            setErr(validate(userChange))
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
        }
    }
  
    return ( props.auth.userInfo ?
                <div className="container-change">
                    <i className="fas fa-times close-btn" onClick={() => {props.setPageState({ page: "info"})}}></i>
                    <h1 className="info-header">Main information</h1>
                    {changeInput("first_name", "First name", userChange.firstName, changeHandler, err.firstNameReq)}
                    {changeInput("last_name", "Last name", userChange.lastName, changeHandler, err.lastNameReq)}

                    <Button style={{width: "150px", display: "block"}} type="Deafault" onClick={() => {props.setPageState({ page: "changePassword"})}}>change password</Button>

                    <h1 className="info-header">Additional information</h1>
                    {changeInput("country", "Country", addChange.country, changeAdditionalHandler)}
                    {changeInput("city", "City", addChange.city, changeAdditionalHandler)}
                    {changeInput("address", "Address", addChange.address, changeAdditionalHandler)}
                    {changeInput("postal", "Postal code", addChange.postal, changeAdditionalHandler)}
                    <button className="submit-btn" onClick={submitHandler}>Submit</button>
                </div>
                : null 
    )
});