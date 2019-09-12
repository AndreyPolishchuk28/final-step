import React from "react";
import '../LoginPage/style-modal-window.css'

export const Registration = () =>{
    const validation = () =>{

    }


    const registrationUser = async () =>{
        const name = document.getElementById('name').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        const response = await fetch('/new_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: name,
                last_name: lastName,
                email: email,
                password: password,
            })
        });
        const responseJSON = await response.json();
        if(responseJSON.registered){
            window.location.href = '/'
        }else{
            alert('Такой пользователь уже есть')
        }
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
                        <input id='name' name='name' type='text' placeholder='Your name...' className='login-email-input'/>
                        </label>
                        <label className='login-input-title'>
                            Last name
                            <input id='lastName' name='surname' type='text' placeholder='Last name...' className='login-email-input'/>
                        </label>
                        <label className='login-input-title'>
                            E-mail
                            <input id='email' name='email' type='text' placeholder='Your email...' className='login-email-input'/>
                        </label>
                        <label className='login-input-title'>
                            Password
                            <input id='password'  name='password' type='password' placeholder='Your password...' className='login-email-input'/>
                        </label>
                        <label className='login-input-title'>
                            Confirm Password
                            <input id='confirmPassword'  name='confirm-password' type='password' placeholder='Confirm password...' className='login-email-input'/>
                        </label>
                    </div>
                </div>
                <div className='register-btn-wrapper'>
                    <div onClick={registrationUser} className='register-btn login-submit-btn registration-btn'>REGISTER</div>
                </div>
            </div>
        </div>
    )
}