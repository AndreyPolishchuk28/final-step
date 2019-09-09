import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Orders} from './Orders'
import {FullOrder} from './FullOrder'
import {AccInfoChange} from './AccInfoChange'
import {ChangePassword} from './ChangePassword'
import {AccInfo} from './AccInfo'

import './scss/style.scss'

export const MyAccountPage = () => {

    const [userInfo, setUserInfo] = useState();

    const getUserInfo = async () => {
        console.log("feyxh");
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
            <section className="main-wrapper">
                <nav className="acc-navigation">
                    <Link exact to="/account">
                        <button className={"button-history"} size="large" type="default"><i class="far fa-id-card"></i>Account info</button>
                    </Link>
                    <Link exact to="/account/orders">
                        <button className={"button-history"} size="large" type="default"><i class="fas fa-clipboard-list"></i>Order history</button>
                    </Link>
                </nav>
                <Switch>
                    <Route exact path='/account' render={(props) => <AccInfo {...props} userInfo={userInfo}/>} />
                    <Route exact path='/account/info/change'  render={(props) => <AccInfoChange {...props} userInfo={userInfo} setUserInfo={setUserInfo}/>} />
                    <Route path='/account/info/change/pass'  render={(props) => <ChangePassword {...props} userInfo={userInfo} setUserInfo={setUserInfo}/>} />
                    <Route exact path='/account/orders' component={Orders}/>
                    <Route path='/account/orders/:id' component={FullOrder}/>
                </Switch>
            </section>
        </Router>
        )
};