import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './redux'
import {CardPage, CheckoutPage, Footer, Header, HomePage, LoginPage, MyAccountPage, ProductDetailsPage, ProductListPage} from "./components";

import './App.css';

function App() {
  return (
      <Provider store={store}>
          <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route path='/' exact component={HomePage}/>
                        <Route path='/card' component={CardPage}/>
                        <Route path='/checkout' component={CheckoutPage}/>
                        <Route path='/login' component={LoginPage}/>
                        <Route path='/account' component={MyAccountPage}/>
                        <Route path='/product-list/:category' component={ProductListPage}/>
                        <Route path='/product/:id' exact component={ProductDetailsPage}/>
                    </Switch>
                    <div className='container mt-5'>Dima</div>
                    <i className="fas fa-search"></i>
                    <Footer/>
                </div>
          </Router>
      </Provider>
  );
}

export default App;
