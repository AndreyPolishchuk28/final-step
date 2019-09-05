import React from "react";
import './style.css'
import {Link} from "react-router-dom";

const subCategory = ['Guitars', 'Keyboards', 'Drums', 'Microphones', 'Earphones'];

export const Menu = () =>{
    let category;
    category = subCategory.forEach(item =>{
        console.log(item);
        return <p>{item}</p>
    });
    console.log(category);


    function slideMenu() {
        let menu = document.querySelector('.main-menu');
        menu.classList.toggle('main-menu-height')
    }
    function subMenu() {
       document.querySelector('.sub-menu').classList.add('sub-menu-over')
    }

    function subMenuOut() {
        document.querySelector('.sub-menu').classList.remove('sub-menu-over')
    }

    return(
        <nav className='main-navbar'>
            {category}
            <div className='container'>
                <a onClick={slideMenu} className='menu-btn' href='#'>
                    <span className='slicknav-menutxt'>MENU</span>
                    <i className="fas fa-bars bars-icon"></i>
                </a>
                <ul className='main-menu '>
                    <Link to='/product-list/guitars'><span onMouseOver={subMenu} onMouseOut={subMenuOut} className='category-item'>Guitars</span></Link>
                    <ul onMouseOver={subMenu} onMouseOut={subMenuOut} className='sub-menu'>
                        <li>Jackson</li>
                        <li>Ibanez</li>
                        <li>ESP</li>
                        <li>Hamer</li>
                        <li>Gibson</li>
                    </ul>
                    <Link to='/product-list/keyboards'><span className='category-item'>Keyboards</span></Link>
                    <Link to='/product-list/drums'><span className='category-item'>Drums</span></Link>
                    <Link to='/product-list/microphones'><span
                        className='category-item'>Microphones</span></Link>
                    <Link to='/product-list/earphones'><span className='category-item'>Earphones</span></Link>
                </ul>
            </div>

        </nav>
    )
}