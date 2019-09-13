import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return{...state}
}

export const ProductListItem = connect(mapStateToProps)( props => {
    const product = props.product
    const productId = product._id

    const addToBasketRes = async () => {
		addToBasket(props.dispatch,{
			id: productId,
        	quantity: 1
        
		})
    };
    
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
                <button href ="#"  onClick={addToBasketRes} className="add-card">
                    <i className="fas fa-shopping-cart"></i>
                    <span>Add to card</span>
                </button>
            </div>
        </div>
        
    )
})