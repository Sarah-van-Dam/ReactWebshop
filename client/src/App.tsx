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


export interface IShopContext {
  currentUser: User | undefined;
  updateCurrentUser: (user : User) => void;
  categories: Category[];
  annoymousBasket: Product[];
  updateAnnoymousBasket: (basket : Product[]) => void;
}

// create context, but there is no default value - set it to undefined.
export const ShopContext = React.createContext<IShopContext | undefined>(undefined);

export const App = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect( () => {
    getCategoriesAPI()
    .then((data)=> {
       console.log(data)
       setCategoryList(data);
    }).catch((e) => {
       console.log(e.message);
    })
  }, []);

  const [, updateUserState] = useState<User>({name: "", email: "", password: "", basket: []})

  const updateCurrentUserFun = (user : User) => {
    updateUserState(user);
  }

  const [, updateAnnoymousBasketState] = useState<Product[]>([])

  const updateAnnoymousBasketFun = (basket : Product[]) => {
    updateAnnoymousBasketState(basket);
  }


  return (
    <ShopContext.Provider value= {{currentUser:undefined, updateCurrentUser: updateCurrentUserFun, 
    categories:categoryList, annoymousBasket:[], updateAnnoymousBasket: updateAnnoymousBasketFun}}>
      <div className="App">
        <BrowserRouter>
            <Header />
            <Switch>
                  <Route exact path="/products" component={() => <Products/>} />
                  <Route exact path="/products/:tags" component={() => <DetailedProduct/>} />
                  <Route exact path="/login" component={() => <Login/>} />
                  <Route exact path="/register" component={() => <Register/>} />
                  <Route exact path="/basket" component={Basket} />
                  <Route exact path="/home" component={Home} />
                  <Route path="/" component={Home} />
            </Switch>
            <Footer />
        </BrowserRouter>
      </div>
    </ShopContext.Provider>
  );
}

export default App;

