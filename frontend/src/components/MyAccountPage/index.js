import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux'
import {getUserInfo} from '../../redux/auth'

import {Orders} from './Orders'
import {FullOrder} from './FullOrder'
import {AccInfoChange} from './AccInfoChange'
import {ChangePassword} from './ChangePassword'
import {AccInfo} from './AccInfo'

import './scss/main.scss'
import {Button, ButtonGroup} from "antd"

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const MyAccountPage = connect(mapStateToProps, {getUserInfo})((props) => { 

    const [ pageState, setPageState ] = useState({ page: "info"})

    const [ order, setOrder ] = useState({ id: "info"})

    const returnPage = () => {
        switch(pageState.page){
            case "info":
                return <AccInfo userInfo={props.auth.userInfo} setPageState={setPageState}/>
            case "changeInfo":
                return <AccInfoChange setPageState={setPageState}/>
            case "changePassword":
                return <ChangePassword setPageState={setPageState}/>
            case "orders":
                return <Orders setPageState={setPageState} setOrder={setOrder}/>
            case "fullOrder":
                return <FullOrder setPageState={setPageState} id={order.id}/>
        }
    }

    
    useEffect(() => {
        props.getUserInfo()
    },[])

    return (
            <section className="main-wrapper">
                <Button.Group>
                    <Button size="large" onClick={() => {setPageState({ page: "info"})}}>Account info</Button>
                    <Button size="large" className={"navigation-btn navigation-btn-bot"} onClick={() => {setPageState({ page: "orders"})}}>Order history</Button>
                </Button.Group>
                <div className="page-viewer">
                    {returnPage()}
                </div>
            </section>
        )
});