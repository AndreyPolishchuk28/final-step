import React  from "react";
import './style.css'
import {Link} from "react-router-dom";

const item = ['Guitars', 'Keyboards', 'Drums', 'Microphones', 'Earphones'];
const producer = ['Ibanez', 'Jackson', 'ESP', 'Hamer', 'Gibson'];

export const Menu = () =>{
    let category = item.map(element =>
        <Link key={element} to={`/product-list/${element.toLowerCase()}`}><span className='category-item'>{element}</span></Link>
    );

    // function subMenu() {
    //    document.querySelector('.sub-menu').classList.add('sub-menu-over')
    // }
    // function subMenuOut() {
    //     document.querySelector('.sub-menu').classList.remove('sub-menu-over')
    // }

    const openMenu = () =>{
        document.getElementById('sidebar').classList.toggle('active');
    }

    return(
        <nav className='main-navbar'>
            <div className='container' id='sidebar'>
                <div className='toggle-btn' onClick={openMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className='main-menu '>
                    <ul className='sub-menu'>
                        <li>Jackson</li>
                        <li>Ibanez</li>
                        <li>ESP</li>
                        <li>Hamer</li>
                        <li>Gibson</li>
                    </ul>
                    {category}
                </ul>
            </div>
        </nav>
    )
}