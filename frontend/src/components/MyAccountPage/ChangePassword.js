import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux'
import {changePassword, clearChangePasswordStatus} from '../../redux/auth'

import {Button, Icon, Input, message} from "antd"
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

    const [err, setErr] = useState({});

    const changeHandler = (event) => {
        setPassChange({
            ...passChange,
            [event.target.id]: event.target.value
        })
    }

    function validate(passChange) {
        let errors = {};

        if(!passChange.currentPass){
            errors.currentPassReq = '*'
        }
        if(!passChange.pass){
            errors.passReq = '*'
        }
        if (passChange.pass !== passChange.repeatPass){
            errors.confirmPass = "*";
        }
        if (passChange.pass && passChange.pass.length < 6) {
            errors.passL = "Password should contain more than 6 characters";
        }
        if (props.auth.changePasswordStatus === "Failed") {
            errors.currPassValid = "Current password is incorrect";
        }
        return errors
    }

    const changePassInput = (strFor, label, changeFunc, error) => {
        return (
            <div className="change-input-wrapper">
                <Input.Password placeholder={label} onChange={changeFunc} id={strFor} size="large"/>
                {error ? <p className='err-change'>{error}</p> : null}
            </div>
        )
    }
    
    const submitHandler = () => {
        let errors = validate(passChange)
        
        if (Object.keys(errors).length){
            setErr(validate(passChange))
            message.error('Not all fields are correct', 5);
        } else {
            const data = {
                oldPassword: passChange.currentPass,
                newPassword:  passChange.pass
            }
            props.changePassword(data)
            message.success('Your password have changed!');
        }
    }

    useEffect(() => () => {
        props.clearChangePasswordStatus()
    },[])

    useEffect(() => {
        if(props.auth.changePasswordStatus === "Success"){
            props.setPageState({ page: "changeInfo"})
        } else if(props.auth.changePasswordStatus === "Failed"){
            setErr(validate(passChange))
            props.clearChangePasswordStatus()
        }
    },[props.auth.changePasswordStatus])
  
    return (
        <div className="container-change">
            <h1 className="change-header">Password</h1>
            {changePassInput("currentPass", "Current password", changeHandler, err.currentPassReq)}
            {err.currPassValid ? <p className='error'>{err.currPassValid}</p> : null}
            {changePassInput("pass", "Password for change", changeHandler, err.passReq)}
            {err.passL ? <p className='error'>{err.passL}</p> : null}
            {changePassInput("repeatPass", "Reapet password for change", changeHandler, err.confirmPass)}
            <div class="basic-btn-change-wrap">
                <button onClick={submitHandler} className="basic-btn-change">Submit</button>
                <button onClick={() => {props.setPageState({ page: "changeInfo"})}} className="basic-btn-change">Go back</button>
            </div>
        </div>
    )
});
