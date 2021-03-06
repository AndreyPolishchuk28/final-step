import React from 'react'


import {connect} from 'react-redux'

import './scss/main.scss'
import {Button} from 'antd'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const AccInfo = connect(mapStateToProps) ((props) => { 
    return (
        props.auth.userInfo ?
        <div className={"info-container"}>        
                <h1 className="info-header">Main information</h1>
                <h2 className="info-items">Name: {props.auth.userInfo.firstName}</h2>
                <h2 className="info-items">Last name: {props.auth.userInfo.lastName}</h2>
                <h2 className="info-items">E-mail: {props.auth.userInfo.email}</h2>
                <h1 className="info-header">Additional information</h1>
                <h2 className="info-items">Country: {props.auth.userInfo.def_address.country}</h2>
                <h2 className="info-items">City: {props.auth.userInfo.def_address.city}</h2>
                <h2 className="info-items">Address: {props.auth.userInfo.def_address.address}</h2>
                <h2 className="info-items">Postal code: {props.auth.userInfo.def_address.postal}</h2>
                <button onClick={() => {props.setPageState({ page: "changeInfo"})}} className="basic-btn">Change info</button>
            </div>
            : null
    )
})