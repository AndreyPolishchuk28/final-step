import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import './scss/style.scss'

export const ChangePassword = (props) => {

    const [ passChange, setPassChange] = useState({
        currentPass: "",
        pass: "",
        repeatPass: ""
    })

    const changeHandler = (event) => {
        setPassChange({
            ...passChange,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = async () => {
        if (passChange.pass !== passChange.repeatPass){
            alert("passwords doesn't match")
        } else if (passChange.currentPass !== props.userInfo.password){
            alert('current password is incorrect')
        } else if(passChange.pass.length < 8){
            alert('password must contain atleast 8 charecters')
        }
        else {
            const data = await {
                password: passChange.pass
            }

            await fetch("/change_customer_info",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            props.setUserInfo(data)

            props.history.push('/account/info/change')
        }
    }
  
    return (
        <div className="container-change">
            <Link to="/account/info/change">
                <i class="fas fa-times close-btn"></i>
            </Link>
            <input className="input-change"  type="text" onChange={changeHandler} placeholder="Type current password" name="currentPass"/>
            <input className="input-change"  type="text" onChange={changeHandler} placeholder="Password for change" name="pass"/>
            <input className="input-change"  type="text" onChange={changeHandler} placeholder="Reapet password for change" name="repeatPass"/>
            <button className="submit-btn" onClick={submitHandler}>Submit password</button>
        </div>
    )
};