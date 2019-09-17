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
    
    const changeHandler = (event) => {
        setUserChange({
            ...userChange,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = async () => {
        if(userChange.first_name < 1){
            alert('First name must contain atleast 1 charecter')
        } else if(userChange.last_name < 1){
            alert('Last name must contain atleast 1 charecter')
        } else{
            const data = await {
                first_name: userChange.first_name,
                last_name: userChange.last_name,
                email: props.auth.userInfo.email
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
                    <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.auth.userInfo.first_name} placeholder="First name" name="first_name"/>
                    <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.auth.userInfo.last_name } placeholder="Last name" name="last_name"/>
                    <Link to="/account/info/change/pass">
                        <Button type="Deafault">change password</Button>
                    </Link>
                    <button className="submit-btn" onClick={submitHandler}>Submit</button>
                </div>
                : null 
    )
});