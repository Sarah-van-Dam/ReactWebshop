import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";

import './App.css';

import { Header } from './components/header';
import { Footer } from './components/footer';


export const App = () => {
  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
