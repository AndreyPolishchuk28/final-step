import React, {useState, useEffect} from 'react'
import {Button, Input, Col, Row} from 'antd'
import {Link} from 'react-router-dom';
import './scss/style.scss'

export const AccInfo = (props) => { 

    return (
        <div className={"info-container"}>   
            <Link exact to="/account/orders">
                <button className={"button-history"} size="large" type="default"><i class="fas fa-clipboard-list"></i>Show order history</button>
            </Link>
            {props.userInfo ?
                <div className={"info-container__items"}>
                <h2>Name: {props.userInfo.first_name}</h2>
                <h2>Last name: {props.userInfo.last_name}</h2>
                <h2>E-mail: {props.userInfo.email}</h2>
                <Link exact to="/account/info/change">
                    <Button type="default">Change profile info</Button>
                </Link>
            </div>
            : null
            }
            
        </div>
    )
}