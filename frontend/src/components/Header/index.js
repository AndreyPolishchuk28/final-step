import React, {useEffect, useState} from 'react'
import './style.css'
import {Link} from "react-router-dom";
import {Search} from "./Search";
import {Menu} from "./Menu";
import {connect} from 'react-redux'

const mapStateToProps = state =>{
    return{
        ...state
    }
};

export const Header = connect (mapStateToProps)(props => {
    const checkLogin = async () =>{
        const response =  await fetch('/get_login_status');
        const responseJSON = await response.json();
        props.dispatch({
            type: 'CHANGE_STATUS',
            payload: {loginStatus: responseJSON.loginStatus}
        })
    };

    const logOut = async () =>{
        await fetch('/logout');
        props.dispatch({
            type: 'CLEAR_BASKET'
        });
        checkLogin()
    };

    return (
        <div>
            <div className='header-top'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-3 text-center text-left'>
                            <Link to='/'><span className='site-logo'>MUSIC-SHOP</span></Link>
                        </div>
                        <div className='col-xl-5 col-lg-5'>
                        <Search/>
                        </div>
                        <div className='col-xl-4 col-lg-4 text-center'>
                            <div className='user-panel'>
                                <div className='up-item'>
                                    {props.loginStatus ?
                                        <div>
                                            <i className="far fa-user"></i>
                                            <Link to='/account'><span className='account'>Account</span></Link>
                                            <span className='btn-logout' onClick={logOut}>Logout</span>
                                        </div>
                                        :
                                        <div>
                                        <i className="far fa-user"></i>
                                        <Link to='/login'><span className='login'>Login</span></Link>
                                        </div>
                                    }
                                </div>
                                <div className='up-item'>
                                    <div className='shopping-card'>
                                        <i className="fas fa-shopping-bag"></i>
                                        <span className='basket-quantity'>{props.products ? props.products.length:0}</span>
                                    </div>
                                    <Link to='/card'><span className='shopping-cart'>Shopping Cart</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Menu/>
        </div>
    )
});
