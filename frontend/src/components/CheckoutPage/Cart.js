import React from 'react'

import './scss/style.scss'

import {Icon} from 'antd'


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
                        event.target.children[0].style.color = "#173F5F"}
                }
                }

                onMouseLeave = {(event) => {
                    if(event.target.className === "prod-views"){
                        event.target.children[0].style.color = "#999999"}
                }
                }>

                    <Icon type="info-circle" theme="filled" className="show-close-info-btn" onClick={(event) => {
                        if(event.target.tagName === "svg"){
                            // console.log(event.target.tagName);
                            event.target.parentElement.style.top = "100%"
                            event.target.parentElement.nextElementSibling.style.top = "-1px"
                        }
                    }}></Icon>

                    <div className="prod-info"  
                    onMouseLeave = {(event) => {
                        if(event.target.className === "prod-info"){
                            event.target.style.top = "100%"
                            event.target.previousElementSibling.style.top = "calc(100% - 25px)"
                            event.target.previousElementSibling.style.color = "#999999"
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