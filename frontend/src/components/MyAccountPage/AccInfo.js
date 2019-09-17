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
                <h2>Name: {props.auth.userInfo.first_name}</h2>
                <h2>Last name: {props.auth.userInfo.last_name}</h2>
                <h2>E-mail: {props.auth.userInfo.email}</h2>
                <Link exact to="/account/info/change">
                    <Button type="default">Change profile info</Button>
                </Link>
            </div>
            : null
            }
            
        </div>
    )
})