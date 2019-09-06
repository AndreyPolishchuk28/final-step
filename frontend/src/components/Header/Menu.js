import React  from "react";
import './style.css'
import {Link} from "react-router-dom";
import index from "styled-components/dist/styled-components-macro.esm";

const item = ['Guitars', 'Keyboards', 'Drums', 'Microphones', 'Earphones'];

export const Menu = () =>{
    let category = item.map(element =>
        <Link to={`/product-list/${element.toLowerCase()}`}><span className='category-item'>{element}</span></Link>
    );

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
            <div className='container'>
                <a onClick={slideMenu} className='menu-btn' href='#'>
                    <span className='slicknav-menutxt'>MENU</span>
                    <i className="fas fa-bars bars-icon"></i>
                </a>
                <ul className='main-menu '>
                    {/*<Link to='/product-list/guitars'><span onMouseOver={subMenu} onMouseOut={subMenuOut} className='category-item'>Guitars</span></Link>*/}
                    {/*<ul onMouseOver={subMenu} onMouseOut={subMenuOut} className='sub-menu'>*/}
                    {/*    <li>Jackson</li>*/}
                    {/*    <li>Ibanez</li>*/}
                    {/*    <li>ESP</li>*/}
                    {/*    <li>Hamer</li>*/}
                    {/*    <li>Gibson</li>*/}
                    {/*</ul>*/}
                    {category}
                </ul>
            </div>
        </nav>
    )
}