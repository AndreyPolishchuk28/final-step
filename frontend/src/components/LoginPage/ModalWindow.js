import React from "react";
import './style-modal-window.css'
import {Link, withRouter} from "react-router-dom";
import {connect} from 'react-redux'

const mapStateToProps = state =>{
    return{
        ...state
    }
};

export const ModalWindow = withRouter( connect(mapStateToProps)((props) =>{
    const LoginAuth = async () =>{
            const email = document.getElementById('email');
            const password = document.getElementById('password');

            const response = await fetch ('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: `${email.value}`,
                    password: `${password.value}`
                }),
            });
                const responseJSON = await response.json();
                props.dispatch({
                    type: 'CHANGE_STATUS',
                    payload: {loginStatus: responseJSON.loginStatus}
                });
                if (responseJSON.loginStatus) {
                    props.history.push('/')
                } else {
                    alert(responseJSON.message)
                }
    };

    return(
        <div className='modal-background'>
            <div className='login-menu'>
                <Link to='/'>
                    <div className='login-close-btn'>x</div>
                </Link>
                    <h2 className='login-menu-header'>Login</h2>
                        <p className='login-menu-subtitle'>Please enter your account details</p>
                            <div className='login-menu-form'>
                                <div className='field-wrapper'>
                                    <label className='login-input-title'>
                                        E-mail
                                        <input key='001' id='email' name='email' type='text' placeholder='Your email...' className='login-email-input'/>
                                    </label>
                                    <label className='login-input-title'>
                                        Password
                                        <input key='002' id='password'  name='password' type='password' placeholder='Your password...' className='login-email-input'/>
                                    </label>
                                </div>
                                    <button onClick={LoginAuth} name='loginSubmit' className='login-submit-btn'>LOG IN</button>
                            </div>

                    <div className='registration-wrapper'>
                        <Link to='/registration'>
                            <div className='register-btn login-submit-btn'>REGISTER HERE</div>
                        </Link>
                    </div>

            </div>
        </div>
        )
}));