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

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = event =>{
        const {name, value} = event.target;
        setValues({
            ...values,
            [name]: value
        })
    };

    const handleSubmit = event =>{
        event.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true)
    };

    useEffect(() =>{
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    },[errors]);



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
                        <input onChange={handleChange} name='name' type='text' placeholder='Your name...' className='login-email-input'/>
                        </label>
                        <label className='login-input-title'>
                            Last name
                            <input onChange={handleChange} name='surname' type='text' placeholder='Last name...' className='login-email-input'/>
                        </label>
                        <label className='login-input-title'>
                            E-mail
                            <input onChange={handleChange} name='email' type='text' placeholder='Your email...' className='login-email-input'/>
                        </label>
                        <label className='login-input-title'>
                            Password
                            <input onChange={handleChange} name='password' type='password' placeholder='Your password...' className='login-email-input'/>
                        </label>
                        <label className='login-input-title'>
                            Confirm Password
                            <input onChange={handleChange} name='confirm-password' type='password' placeholder='Confirm password...' className='login-email-input'/>
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