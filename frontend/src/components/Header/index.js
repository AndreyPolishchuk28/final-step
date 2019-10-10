import React, {useEffect} from 'react'
import './style.css'
import {Link, withRouter} from "react-router-dom";
import {Search} from "./Search";
import {Menu} from "./Menu";
import {connect} from 'react-redux'
import {getMainInfo} from "../../redux/catalog";
import {getBasket} from "../../redux/basket";
import { logout, getLoginStatus } from "../../redux/auth";

const mapStateToProps = state =>{
    return{
        ...state
    }
};

export const Header = withRouter (connect (mapStateToProps, {getMainInfo, getBasket, logout, getLoginStatus})(props => {
    useEffect(()=> {
        props.getLoginStatus();
        props.getMainInfo();
        props.getBasket();
    },[]);

    useEffect(()=> {
        props.getBasket();
    },[props.auth.loginStatus]);

    useEffect(() => {
        if (props.auth.error) alert(props.auth.error);
        if (props.basket.error) alert(props.basket.error);
        if (props.catalog.error) alert(props.catalog.error);
    }, [props.auth.error, props.basket.error, props.catalog.error]);

    const logOut = () =>{
        props.logout();
    };

    return (
        <div>
            <div className='header-top'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-3 text-center text-left pl-0'>
                            <Link to='/'><span className='site-logo'>MUZ-SHOP</span></Link>
                        </div>
                        <div className='col-xl-5 col-lg-5 pl-0'>
                        <Search/>
                        </div>
                        <div className='col-xl-4 col-lg-4 text-center pl-0'>
                            <div className='user-panel'>
                                <div className='up-item'>
                                    {props.auth.loginStatus ?
                                        <div>
                                            <i className="far fa-user"></i>
                                            <Link to='/account'><span className='account'>Account</span></Link>
                                            <span onClick={logOut} className='account'>Logout</span>
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
        </div>
    )
}));