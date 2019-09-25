import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux'
import {getUserInfo} from '../../redux/auth'

import {Orders} from './Orders'
import {FullOrder} from './FullOrder'
import {AccInfoChange} from './AccInfoChange'
import {ChangePassword} from './ChangePassword'
import {AccInfo} from './AccInfo'

import './scss/main.scss'

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
                <nav className="acc-navigation">    
                    <button className={"navigation-btn navigation-btn-top"} onClick={() => {setPageState({ page: "info"})}}><i className="far fa-id-card"></i><span>Account info</span></button>
                    <button className={"navigation-btn navigation-btn-bot"} onClick={() => {setPageState({ page: "orders"})}}><i className="fas fa-clipboard-list"></i><span>Order history</span></button>
                </nav>
                <div className="page-viewer">
                    <div className="top-l-corner"></div>
                    <div className="bot-r-corner"></div>
                    {returnPage()}
                </div>
            </section>
        )
});