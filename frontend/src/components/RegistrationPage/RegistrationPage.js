import React, {useState} from "react";
import '../LoginPage/style-modal-window.css'
import { createNewUser } from "../../redux/auth";
import {connect} from 'react-redux'

const mapStateToProps = state =>{
    return{
        ...state
    }
};

export const Registration = connect(mapStateToProps,{createNewUser})(props =>{
    const validation = () =>{};

    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const handleName = event => {
        setName(event.target.value);
    };
    const handleLastName = event => {
        setLastName(event.target.value);
    };
    const handleEmail = event => {
        setEmail(event.target.value);
    };
    const handlePassword = event => {
        setPassword(event.target.value);
    };
    const handleConfirmPassword = event => {
        setConfirmPassword(event.target.value);
    };

    const registrationUser = async () =>{
        props.createNewUser({
            username: name,
            lastName: lastName,
            email: email,
            password: password
        });
    };

    return(
        <div>
            <div className='login-menu register'>
                <h2 className='login-menu-header'>Register</h2>
                <p className='login-menu-subtitle'>Please enter your information</p>
                <div className='login-menu-form'>
                    <div className='field-wrapper'>
                        <label className='login-input-title'>
                        First name
                        <input onChange={handleName} name='name' type='text' placeholder='Your name...' className='login-email-input'/>
                        </label>
                        <label className='login-input-title'>
                            Last name
                            <input onChange={handleLastName} name='surname' type='text' placeholder='Last name...' className='login-email-input'/>
                        </label>
                        <label className='login-input-title'>
                            E-mail
                            <input onChange={handleEmail} name='email' type='text' placeholder='Your email...' className='login-email-input'/>
                        </label>
                        <label className='login-input-title'>
                            Password
                            <input onChange={handlePassword} name='password' type='password' placeholder='Your password...' className='login-email-input'/>
                        </label>
                        <label className='login-input-title'>
                            Confirm Password
                            <input onChange={handleConfirmPassword} name='confirm-password' type='password' placeholder='Confirm password...' className='login-email-input'/>
                        </label>
                    </div>
                </div>
                <div className='register-btn-wrapper'>
                    <div onClick={registrationUser} className='register-btn login-submit-btn registration-btn'>REGISTER</div>
                </div>
            </div>
        </div>
    )
});