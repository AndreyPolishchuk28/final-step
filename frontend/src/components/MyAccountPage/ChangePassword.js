import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux'
import {changePassword, clearChangePasswordStatus} from '../../redux/auth'

import './scss/change.scss'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const ChangePassword = connect(mapStateToProps, { changePassword, clearChangePasswordStatus}) ((props) => {

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

    const submitHandler = () => {
        if (passChange.pass !== passChange.repeatPass){
            alert("passwords doesn't match")
        } else if(passChange.pass.length < 6){
            alert('password must contain atleast 6 charecters')
        } else{ 
            const data = {
                oldPassword: passChange.currentPass,
                newPassword:  passChange.pass
            }
            props.changePassword(data)

            }
        }

    useEffect(() => () => {
        props.clearChangePasswordStatus()
    },[])

    useEffect(() => {
        if(props.auth.changePasswordStatus === "Success"){
            props.setPageState({ page: "changeInfo"})
        } else if(props.auth.changePasswordStatus === "Failed"){
            alert("u r  dumbass!!!")
            props.clearChangePasswordStatus()
        }
    },[props.auth.changePasswordStatus])
  
    return (
        <div className="container-change">
            <i className="fas fa-times close-btn" onClick={() => {props.setPageState({ page: "changeInfo"})}}></i>
            <h1 className="info-header">Password</h1>
            <input className="input-change"  type="text" onChange={changeHandler} placeholder="Type current password" name="currentPass"/>
            <input className="input-change"  type="text" onChange={changeHandler} placeholder="Password for change" name="pass"/>
            <input className="input-change"  type="text" onChange={changeHandler} placeholder="Reapet password for change" name="repeatPass"/>
            <button className="submit-btn" onClick={submitHandler}>Submit password</button>
        </div>
    )
});