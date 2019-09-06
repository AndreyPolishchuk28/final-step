import React from 'react'
import {Link} from 'react-router-dom'
export const ProductListItem = (props) => {
    const product = props.product
    
    return (
        <div className="product-item">
            <Link to={`/product/${product.id}`}>
            <div className="pi-picture">
                <img src={`/static/img/${product.photo[0]}`}/>
            </div>
            <div className="pi-text">
                <p className="pi-text__header">{product.name}</p>            
                <p className="pi-text__price">${product.price},00</p>
            </div>
            </Link>
            <div className="pi-links">
                <a href ="#" className="add-card">
                    <i className="fas fa-shopping-cart"></i>
                    <span>Add to card</span>
                </a>
            </div>
        </div>
        
    )
} 