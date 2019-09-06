import React, {useState} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Orders} from './Orders'
import {AccInfoChange} from './AccInfoChange'
import {AccInfo} from './AccInfo'

import './scss/style.scss'

export const MyAccountPage = (props) => {
    return (
        <Router>
            <Switch>
                <Route exact path='/account' component={AccInfo}/>
                <Route path='/account/info/change' component={AccInfoChange}/>
                <Route exact path='/account/orders' component={Orders}/>
                <Route exact path='/account/orders/fullone' component={Orders}/>
            </Switch>
        </Router>
        )
};

MyAccountPage.defaultProps = {
    first_name: "Ivan",
    full_name: "Ivan Bohatov",
    last_name: "Bohatov",
    email: "ibohatov@mail.com",
}
