import React, {useState} from 'react'
import {Button} from 'antd'
import {Link} from 'react-router-dom';

import {connect} from 'react-redux'
import {changeUserInfo} from '../../redux/auth'

import './scss/style.scss'

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
    
    const changeHandler = (event) => {
        setUserChange({
            ...userChange,
            [event.target.name]: event.target.value
        })
    }

    const changeAdditionalHandler = (event) => {
        setAddChange({
            ...addChange,
            [event.target.name]: event.target.value 
        })
        console.log(addChange);
    }

    const submitHandler = async () => {
        if(userChange.first_name < 1){
            alert('First name must contain atleast 1 charecter')
        } else if(userChange.last_name < 1){
            alert('Last name must contain atleast 1 charecter')
        } else{
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

            props.history.push('/account')
        }
    }
  
    return ( props.auth.userInfo ?
                <div className="container-change">
                    <Link to="/account">
                        <i class="fas fa-times close-btn"></i>
                    </Link>
                    <input className="input-change" type="text" onChange={changeHandler} defaultValue={userChange.firstName} placeholder="First name" name="firstName"/>
                    <input className="input-change" type="text" onChange={changeHandler} defaultValue={userChange.lastName } placeholder="Last name" name="lastName"/>
                    <Link to="/account/info/change/pass">
                        <Button type="Deafault">change password</Button>
                    </Link>
                    <h1>Additional information</h1>
                    <input className="input-change" type="text" onChange={changeAdditionalHandler} defaultValue={addChange.country } placeholder="country" name="country"/>
                    <input className="input-change" type="text" onChange={changeAdditionalHandler} defaultValue={addChange.city } placeholder="city" name="city"/>
                    <input className="input-change" type="text" onChange={changeAdditionalHandler} defaultValue={addChange.address } placeholder="address" name="address"/>
                    <input className="input-change" type="text" onChange={changeAdditionalHandler} defaultValue={addChange.postal } placeholder="Postal code" name="postal"/>
                    <button className="submit-btn" onClick={submitHandler}>Submit</button>
                </div>
                : null 
    )
});