import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './redux'
import {
    CardPage,
    CheckoutPage,
    Footer,
    Header,
    HomePage,
    LoginPage,
    MyAccountPage,
    ProductDetailsPage,
    ProductListPage,
    RegistrationPage
} from "./components";

import './App.css';
import {Menu} from "./components/Header/Menu";

function App() {
  return (
      <Provider store={store}>
          <Router>
                <div className="App">
                    <Header/>
                    <Menu/>
                    <Switch>
                        <Route path='/' exact component={HomePage}/>
                        <Route path='/card' component={CardPage}/>
                        <Route path='/checkout' component={CheckoutPage}/>
                        <Route path='/login' component={LoginPage}/>
                        <Route path='/registration' component={RegistrationPage}/>
                        <Route path='/account' component={MyAccountPage}/>
                        <Route path='/product-list/:category' component={ProductListPage}/>
                        <Route path='/product/:id' component={ProductDetailsPage}/>
                    </Switch>
                    <Footer/>
                </div>
          </Router>
      </Provider>
  );
}

export default App;
