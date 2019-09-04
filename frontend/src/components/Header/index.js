import React, {useState} from 'react'
import './style.css'
import {Link} from "react-router-dom";

export const Header = () => {
    const [open, setOpen] = useState(true);
    const HandlerBtn = () =>{
        setOpen(!open);
    };

    function slideMenu() {
        let menu = document.querySelector('.main-menu');
        menu.classList.toggle('main-menu-height')
    }


    return (
        <div>
            <div className='header-top'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-3 text-center text-left'>
                            <Link to='/'><span className='site-logo'>MUSIC-SHOP</span></Link>
                        </div>
                        <div className='col-xl-6 col-lg-5'>
                            <form className='header-search-form'>
                                <input type='text' placeholder='Music shop search ...'/>
                                <button>
                                    <i className="fas fa-search"></i>
                                </button>
                            </form>
                        </div>

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

            <nav className='main-navbar'>
                <div className='container'>
                    <a onClick={slideMenu} className='menu-btn clearfix' href='#'>
                        <span className='slicknav-menutxt'>MENU</span>
                        <i className="fas fa-bars bars-icon"></i>
                    </a>
                    {open ?
                        <ul className='main-menu '>
                            <Link to='/product-list/guitars'><span className='category-item'>Guitars</span></Link>
                            <Link to='/product-list/keyboards'><span className='category-item'>Keyboards</span></Link>
                            <Link to='/product-list/drums'><span className='category-item'>Drums</span></Link>
                            <Link to='/product-list/microphones'><span
                                className='category-item'>Microphones</span></Link>
                            <Link to='/product-list/earphones'><span className='category-item'>Earphones</span></Link>
                        </ul>
                        : null
                    }
                </div>

            </nav>

        </div>
    )
};


