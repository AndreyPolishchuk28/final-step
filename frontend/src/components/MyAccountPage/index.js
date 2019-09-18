import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';

import {connect} from 'react-redux'
import {getUserInfo} from '../../redux/auth'

import {Orders} from './Orders'
import {FullOrder} from './FullOrder'
import {AccInfoChange} from './AccInfoChange'
import {ChangePassword} from './ChangePassword'
import {AccInfo} from './AccInfo'

import './scss/style.scss'

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export const MyAccountPage = connect(mapStateToProps, {getUserInfo})((props) => {

    useEffect(() => {
        props.getUserInfo()
    },[])

    return (
        <Router>
            <section className="main-wrapper">
                <nav className="acc-navigation">
                    <NavLink exact to="/account">
                        <button className={"navigation-btn navigation-btn-top"} size="large" type="default"><i className="far fa-id-card"></i><span>Account info</span></button>
                    </NavLink>
                    <NavLink exact to="/account/orders">
                        <button className={"navigation-btn navigation-btn-bot"} size="large" type="default"><i className="fas fa-clipboard-list"></i><span>Order history</span></button>
                    </NavLink>
                </nav>
                <div className="page-viewer">
                    <div className="top-l-corner"></div>
                    <div className="bot-r-corner"></div>
                    <Switch>
                        <Route exact path='/account' component={AccInfo}/>
                        <Route exact path='/account/info/change'  component={AccInfoChange} />
                        <Route path='/account/info/change/pass'  component={ChangePassword} />
                        <Route exact path='/account/orders' component={Orders}/>
                        <Route path='/account/orders/:id' component={FullOrder}/>
                    </Switch>
                </div>
            </section>
        </Router>
        )
});