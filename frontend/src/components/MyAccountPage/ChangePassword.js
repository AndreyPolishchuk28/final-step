import React, {useState} from 'react'
import {Link} from 'react-router-dom';

import {connect} from 'react-redux'
import {changeUserInfo} from '../../redux/auth'

import './scss/style.scss'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const ChangePassword = connect(mapStateToProps, {changeUserInfo}) ((props) => {

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
        } else if (passChange.currentPass !== props.auth.userInfo.password){
            alert('current password is incorrect')
        } else if(passChange.pass.length < 6){
            alert('password must contain atleast 6 charecters')
        }
        else {
            const data = await {
                password: passChange.pass
            }

            props.changeUserInfo(data)

            props.setPageState({ page: "changeInfo"})
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
});