import React from 'react'

import './scss/style.scss'


export const Cart = ((props) => {
    const final = props.info.map((elem, index) => {
        const viewBgStyle= {
            backgroundImage: `url('/static/img/${elem.product.photo[0]}')`,
        }
        return (
                <div  className="prod-wrap"  key={index} onClick={(event) => {
                    if(event.target.className === "prod-views"){
                        props.history.push(`/product/${elem.product.id}`)
                    }
                }
                }>
                <div className="prod-views" style={viewBgStyle}

                onMouseOver = {(event) => {
                    if(event.target.className === "prod-views"){
                        event.target.children[0].style.backgroundColor = "#173F5F"}
                }
                }

                onMouseLeave = {(event) => {
                    if(event.target.className === "prod-views"){
                        event.target.children[0].style.backgroundColor = "#999999"}
                }
                }>

                    <button className="show-close-info-btn" onClick={(event) => {
                        event.target.style.top = "100%"
                        event.target.nextElementSibling.style.top = "-1px"
                    }}>?</button>

                    <div className="prod-info"  
                    onMouseLeave = {(event) => {
                        if(event.target.className === "prod-info"){
                            event.target.style.top = "100%"
                            event.target.previousElementSibling.style.top = "calc(100% - 40px)"
                            event.target.previousElementSibling.style.backgroundColor = "#999999"
                        }
                    }
                    }
                    >
                        <h1 className="prod-info__name">Model: <span>{elem.product.name}</span></h1>
                        <h1 className="prod-info__price">Price for one: <span>{elem.product.price}$</span></h1>
                        <h1 className="prod-info__quantity">Quantity in cart: <span>{elem.quantity}x</span></h1>
                    </div>
                </div>
            </div>
        )
     }
   ) 
   return final    
})