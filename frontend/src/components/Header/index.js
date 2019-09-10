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
    const [loginStatus, setLoginStatus] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const checkLogin = async () =>{
        const response =  await fetch('/get_login_status');
        const responseJSON = await response.json();
        setLoginStatus(responseJSON.loginStatus)
    };

    const logOut = async () =>{
        await fetch('/logout');
        checkLogin()
    };

    const getQuantity = async() =>{
        const response = await fetch('/quantity_products');
        const responseJSON = await response.json()
        setQuantity(responseJSON.QuantityProducts)
    };

    useEffect( () =>{
        checkLogin()
    }, []);

    useEffect(() =>{
        getQuantity()
    }, []);

    return (
        <div>
            <div className='header-top'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-3 text-center text-left'>
                            <Link to='/'><span className='site-logo'>MUSIC-SHOP</span></Link>
                        </div>
                        <Search/>
                        <div className='col-xl-3 col-lg-4 text-center'>
                            <div className='user-panel'>
                                <div className='up-item'>
                                    <i className="far fa-user"></i>
                                    {loginStatus ?
                                        <div>
                                            <Link to='/account'><span>Account</span></Link>
                                            <button onClick={logOut}>Logout</button>
                                        </div>
                                        :
                                        <Link to='/login'><span className='login'>Login</span></Link>
                                    }
                                </div>
                                <div className='up-item'>
                                    <div className='shopping-card'>
                                        <i className="fas fa-shopping-bag"></i>
                                        <span onMouseOver={getQuantity} className='basket-quantity'>{quantity}</span>
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
