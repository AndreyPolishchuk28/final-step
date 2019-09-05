import React, {useState} from 'react'
import './style.css'
import {Link} from "react-router-dom";
import {Search} from "./Search";
import {Menu} from "./Menu";

export const Header = () => {
    // const [open, setOpen] = useState(true);
    // const HandlerBtn = () =>{
    //     setOpen(!open);
    // };
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
                                    <Link to='login'><span className='login'>Login</span></Link>
                                </div>
                                <div className='up-item'>
                                    <div className='shopping-card'>
                                        <i className="fas fa-shopping-bag"></i>
                                        <span className='basket-quantity'>0</span>
                                    </div>
                                        <Link to='card'><span className='shopping-cart'>Shopping Cart</span></Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Menu/>
        </div>
    )
};
