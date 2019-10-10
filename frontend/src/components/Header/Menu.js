import React, {useState, useEffect} from "react";
import './style.css'
import {Link, withRouter} from "react-router-dom";

const item = ['Guitars', 'Keyboards', 'Drums', 'Microphones', 'Earphones'];

export const Menu = withRouter((props) =>{
    let category = item.map(element =>
        <Link key={element} to={`/product-list/${element.toLowerCase()}`}><span className='category-item'>{element}</span></Link>
    );

    const [open, setOpen] = useState(false);

    const openMenu = () =>{
        if(open){
            setOpen(false)
        }else{
            setOpen(true)
        }
    };

    const blurHandler = (event) =>{
        setTimeout(()=>{setOpen(false)}, 100);
    };

    useEffect(() =>{
        setOpen(false)
    },[props.location.pathname]);

    return(
        <nav className='main-navbar'>
            <div tabIndex={0} onBlur={blurHandler} className='container container-blur' id='sidebar'>
                <div  className='toggle-btn'  onClick={openMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                {open ? <ul className='main-menu'>
                    {category}
                </ul> : <ul className='main-menu hide'>
                    {category}
                </ul>
                }
            </div>
        </nav>
    )
});