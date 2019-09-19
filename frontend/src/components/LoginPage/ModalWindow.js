import React, {useState} from "react";
import './style-modal-window.css'
import {Link, withRouter} from "react-router-dom";
import {connect} from 'react-redux'
import { login, clearLoginErrors } from "../../redux/auth";

const mapStateToProps = state =>{
    return{
        ...state
    }
};

export const ModalWindow = withRouter( connect(mapStateToProps,{login, clearLoginErrors})((props) =>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleEmail = (event) =>{
        setEmail(event.target.value);
    };
    const handlePassword = (event) =>{
        setPassword(event.target.value);
    };

    const LoginAuth = async () =>{
        props.login({
            username: email,
            password: password,
            history: props.history
        });
    };

    return(
        <div className='modal-background'>
            <div className='login-menu'>
                <Link onClick={() =>{props.clearLoginErrors()}} to='/'>
                    <div className='login-close-btn'>x</div>
                </Link>
                    <h2 className='login-menu-header'>Login</h2>
                        <p className='login-menu-subtitle'>Please enter your account details</p>
                            <div className='login-menu-form'>
                                <div className='field-wrapper'>
                                    <label className='login-input-title'>
                                        E-mail
                                        <input onChange={handleEmail} id='email' name='email' type='text' placeholder='Your email...' className='login-email-input'/>
                                    </label>
                                    <label className='login-input-title'>
                                        Password
                                        <input onChange={handlePassword} id='password'  name='password' type='password' placeholder='Your password...' className='login-email-input'/>
                                    </label>
                                    {props.auth.loginErrorMessage ?
                                        <p className='error'>{props.auth.loginErrorMessage}</p>
                                        : null
                                    }
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