import React, {useState} from 'react'
import {Button} from 'antd'
import {Link} from 'react-router-dom';
import './scss/style.scss'

export const AccInfoChange = (props) => {

    const [ userChange, setUserChange] = useState({
        ...props.userInfo
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
                email: props.userInfo.email
            }

            await fetch("/change_customer_info",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                })
            
            props.setUserInfo(data)

            props.history.push('/account')
        }
    }
  
    return ( props.userInfo ?
                <div className="container-change">
                    <Link to="/account">
                        <i class="fas fa-times close-btn"></i>
                    </Link>
                    <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.userInfo.first_name} placeholder="First name" name="first_name"/>
                    <input className="input-change" type="text" onChange={changeHandler} defaultValue={props.userInfo.last_name } placeholder="Last name" name="last_name"/>
                    <Link to="/account/info/change/pass">
                        <Button type="Deafault">change password</Button>
                    </Link>
                    <button className="submit-btn" onClick={submitHandler}>Submit</button>
                </div>
                : null 
    )
};