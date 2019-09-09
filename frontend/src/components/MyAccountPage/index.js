import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Orders} from './Orders'
import {AccInfoChange} from './AccInfoChange'
import {AccInfo} from './AccInfo'

import './scss/style.scss'

export const MyAccountPage = () => {

    const [userInfo, setUserInfo] = useState();

    const getUserInfo = async () => {
        const response = await fetch("/customer")

        const responseJSON = await response.json();
        setUserInfo(responseJSON);
        console.log(responseJSON);
        console.log(userInfo);
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <Router>
            <Switch>
                <Route exact path='/account' render={(props) => <AccInfo {...props} userInfo={userInfo}/>} />
                <Route path='/account/info/change'  render={(props) => <AccInfoChange {...props} userInfo={userInfo}/>} />
                <Route exact path='/account/orders' component={Orders}/>
                <Route path='/account/orders/fullone' component={Orders}/>
            </Switch>
        </Router>
        )
};