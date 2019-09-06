import React from "react";
import './style-modal-window.css'


export const ModalWindow = () =>{
    return(
        <div className='modal-background'>
            <div className='login-menu'>
                <div className='login-close-btn'>x</div>
                    <h2 className='login-menu-header'>Login</h2>
                        <p className='login-menu-subtitle'>Please enter your account details</p>
                            <form className='login-menu-form'>
                                <div className='field-wrapper'>
                                    <label className='login-input-title'>
                                        E-mail
                                        <input name='email' type='text' placeholder='Your email...' className='login-email-input'/>
                                    </label>
                                    <label className='login-input-title'>
                                        Password
                                        <input name='password' type='password' placeholder='Your password...' className='login-email-input'/>
                                    </label>
                                </div>
                                <button name='loginSubmit' type='submit' className='login-submit-btn'>LOG IN</button>
                            </form>
                <div className='registration-wrapper'>
                    <div className='register-btn login-submit-btn'>REGISTER HERE</div>
                </div>
            </div>
        </div>
        )



}