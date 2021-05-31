import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Category, getCategoriesAPI, Product, User } from './apiHelper';
import { Header } from './components/Header';
import { Products } from './components/Products';
import { DetailedProduct } from './components/DetailedProduct';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Basket } from './components/Basket';
import { Footer } from './components/Footer';
import { Home } from './components/Home';


export const App = () => {
  return (
        <div className="App">
          <BrowserRouter>
              <Header />
              <Switch>
                    <Route exact path="/products" component={Products} />
                    <Route exact path="/products/:productID" component={DetailedProduct} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/basket" component={Basket} />
                    <Route exact path="/home" component={Home} />
                    <Route path="/" component={Home} />
              </Switch>
              <Footer />
          </BrowserRouter>
        </div>
  );
}

export default App;

