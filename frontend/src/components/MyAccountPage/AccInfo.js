import React from 'react'
import {Button} from 'antd'
import {Link} from 'react-router-dom';

import {connect} from 'react-redux'

import './scss/style.scss'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const AccInfo = connect(mapStateToProps) ((props) => { 

    console.log(props);

    return (
        <div className={"info-container"}>   
            {props.auth.userInfo ?
                <div className={"info-container__items"}>
                <h2>Name: {props.auth.userInfo.username}</h2>
                <h2>Last name: {props.auth.userInfo.lastName}</h2>
                <h2>E-mail: {props.auth.userInfo.email}</h2>
                <h1>Additional information</h1>
                <h2>Country: {props.auth.userInfo.def_address.country}</h2>
                <h2>City: {props.auth.userInfo.def_address.city}</h2>
                <h2>Address: {props.auth.userInfo.def_address.address}</h2>
                <Link exact to="/account/info/change">
                    <Button type="default">Change profile info</Button>
                </Link>
            </div>
            : null
            }
            
        </div>
    )
})