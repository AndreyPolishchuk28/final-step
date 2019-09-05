import React, {useState} from 'react'
import {Button, Input, Col, Row} from 'antd'
import {Link} from 'react-router-dom';
import './scss/style.scss'

export const AccInfo = (props) => { 
    return (
        <div className={"info-container"}>   
            <Link exact to="/account/orders">
                <button className={"button-history"} size="large" type="default"><i class="fas fa-clipboard-list"></i>Show order history</button>
            </Link>
            <div className={"info-container__items"}>
                <h2>Name: {props.first_name}</h2>
                <h2>Last name: {props.last_name}</h2>
                <h2>Full name: {props.full_name}</h2>
                <h2>E-mail: {props.email}</h2>
                <Link exact to="/account/info/change">
                    <Button type="default">Change profile info</Button>
                </Link>
            </div>
        </div>
    )
}

AccInfo.defaultProps = {
    first_name: "Ivan",
    full_name: "Ivan Bohatov",
    last_name: "Bohatov",
    email: "ibohatov@mail.com",
}