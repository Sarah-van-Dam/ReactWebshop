import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/ecommerce.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ShopContextProvider } from './context/ShoppingContext';

ReactDOM.render(
  <React.StrictMode>
    <ShopContextProvider>
     <App />
    </ShopContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
