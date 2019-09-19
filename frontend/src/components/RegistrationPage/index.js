import React, {useEffect, useState} from "react";
import '../LoginPage/style-modal-window.css'
import { createNewUser, clearRegistrationErrors } from "../../redux/auth";
import {connect} from 'react-redux'

const mapStateToProps = state =>{
    return{
        ...state
    }
};

export const RegistrationPage = connect(mapStateToProps,{createNewUser, clearRegistrationErrors})(props =>{
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    function validate(values) {
        let errors = {};

        if(!values.firstName){
            errors.firstName = 'First name is required'
        }
        if(!values.lastName){
            errors.lastName = 'Last name is required'
        }
        if (!values.email){
            errors.email = 'Email address is required'
        }else if (!/\S+@\S+\.\S+/.test(values.email)){
            errors.email = "Email address is invalid";
        }
        if (values.password !== values.confirmPassword){
            errors.confirmPassword = "Password don't the same";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }else if (values.password.length < 6) {
            errors.password = "Password needs to be more than 6 characters";
        }
        return errors
    }

    const handleChange = event =>{
        const {name, value} = event.target;
        setValues({
            ...values,
            [name]: value
        })
    };

    const registrationUser = () =>{
        let errors = validate(values);
            if (Object.keys(errors).length){
                setErrors(validate(values));
            } else{
                props.createNewUser({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    history: props.history,
                    def_address: {}
                });
            }
    };

    useEffect(() => () =>{
        props.clearRegistrationErrors()
    },[]);

    return(
        <form>
            <div className='login-menu register'>
                <h2 className='login-menu-header'>Register</h2>
                <p className='login-menu-subtitle'>Please enter your information</p>
                <div className='login-menu-form'>
                    <div className='field-wrapper'>
                        <label className='login-input-title'>
                        First name
                        <input onChange={handleChange} value={values.firstName}  name='firstName' type='text' placeholder='Your name...' className='login-email-input'/>
                            {errors.firstName ? <p className='error'>{errors.firstName}</p> : null}
                        </label>
                        <label className='login-input-title'>
                            Last name
                            <input onChange={handleChange} value={values.lastName} name='lastName' type='text' placeholder='Last name...' className='login-email-input'/>
                            {errors.lastName ? <p className='error'>{errors.lastName}</p> : null}
                        </label>
                        <label className='login-input-title'>
                            E-mail
                            <input onChange={handleChange} value={values.email} name='email' type='text' placeholder='Your email...' className='login-email-input'/>
                            {errors.email && <p className='error'>{errors.email}</p>}
                        </label>
                        <label className='login-input-title'>
                            Password
                            <input onChange={handleChange} value={values.password} name='password' type='password' placeholder='Your password...' className='login-email-input'/>
                            {errors.password && <p className='error'>{errors.password}</p>}
                        </label>
                        <label className='login-input-title'>
                            Confirm Password
                            <input onChange={handleChange} value={values.confirmPassword} name='confirmPassword' type='password' placeholder='Confirm password...' className='login-email-input'/>
                            {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
                            {props.auth.registrationErrorMessage ?
                                <p className='error'>{props.auth.registrationErrorMessage}</p>
                                : null
                            }
                        </label>
                    </div>
                </div>
                <div className='register-btn-wrapper'>
                    <div onClick={registrationUser} className='register-btn login-submit-btn registration-btn'>REGISTER</div>
                </div>
            </div>
        </form>
    )
});