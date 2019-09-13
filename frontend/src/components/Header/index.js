import React, {useEffect, useState} from 'react'
import './style.css'
import {Link} from "react-router-dom";
import {Search} from "./Search";
import {Menu} from "./Menu";
import {connect} from 'react-redux'
import {getMainInfo} from "../../redux/catalog";
import {getBasket} from "../../redux/basket";

const mapStateToProps = state =>{
    return{
        ...state
    }
};

export const Header = connect (mapStateToProps, {getMainInfo, getBasket})(props => {
    useEffect(()=> {
        props.getMainInfo();
        props.getBasket();
    },[]);

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
                                    {props.auth.loginStatus ?
                                        <div>
                                            <i className="far fa-user"></i>
                                            <Link to='/account'><span className='account'>Account</span></Link>
                                            <button className='btn-logout' >Logout</button>
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
                                        <span className='basket-quantity'>{props.basket.products ? props.basket.products.length:0}</span>
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
