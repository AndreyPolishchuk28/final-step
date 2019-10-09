import React,  {useState} from 'react'

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
                <div className="prod-views" style={viewBgStyle}>
                    <Icon type="info-circle" theme="filled" className="show-info-btn active-info-btn" onClick={(event) => {
                        if(event.target.tagName === "svg"){
                            event.target.parentElement.classList.remove("active-info-btn")
                            event.target.parentElement.nextElementSibling.classList.add("active-info-btn")
                            event.target.parentElement.nextElementSibling.nextElementSibling.style.top = "-1px"
                        }
                        if(event.target.tagName === "path"){
                            event.target.parentElement.parentElement.classList.remove("active-info-btn")
                            event.target.parentElement.parentElement.nextElementSibling.classList.add("active-info-btn")
                            event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.style.top = "-1px"
                        }
                    }}></Icon>
                    <Icon type="close-circle" theme="filled" className="close-info-btn" onClick={(event) => {
                        if(event.target.tagName === "svg"){
                            event.target.parentElement.classList.remove("active-info-btn")
                            event.target.parentElement.previousElementSibling.classList.add("active-info-btn")
                            event.target.parentElement.nextElementSibling.style.top = "100%"
                        }
                        if(event.target.tagName === "path"){
                            event.target.parentElement.parentElement.classList.remove("active-info-btn")
                            event.target.parentElement.parentElement.previousElementSibling.classList.add("active-info-btn")
                            event.target.parentElement.parentElement.nextElementSibling.style.top = "100%"
                        }
                    }}></Icon>

                    <div className="prod-info">
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