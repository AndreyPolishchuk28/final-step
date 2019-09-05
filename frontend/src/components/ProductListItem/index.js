import React from 'react'

export const ProductListItem = (props) => {
    const product = props.product
    console.log(props)
    
    return (
        <div className="product-item">
            <div className="pi-picture">
                <img src={`/static/img/${product.photo[0]}`}/>
                <div className="pi-links">
                    <a href ="#" className="add-card">
                        <i class="fas fa-shopping-cart"></i>
                        <span>Add to card</span>
                    </a>
            </div>

            </div>
            <div className="pi-text">
                <p className="pi-text__header">{product.name}</p>            
                <p className="pi-text__price">${product.price},00</p>
            </div>
        </div>
        
    )
} 