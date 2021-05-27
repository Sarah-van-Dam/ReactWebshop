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


export type ShopContextType = {
  isLoggedIn: boolean;
  updateLoggedIn: (loggedIn: boolean) => void;
  currentUser: User;
  updateCurrentUser: (user : User) => void;
  categories: Category[];
  annoymousBasket: Product[];
  updateAnnoymousBasket: (basket : Product[]) => void;
}

// create context, but there is no default value - set it to undefined.
export const ShopContext = React.createContext<ShopContextType | undefined>(undefined);

export const App = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect( () => {
    getCategoriesAPI()
    .then((data)=> {
       setCategoryList(data);
    }).catch((e) => {
       console.log(e.message);
    })
  }, []);

  const [user, updateUserState] = useState<User>({customerName: "", email: "", password: "", basket: []})

  const updateCurrentUserFun = (user : User) => {
    updateUserState(user);
  }

  const [, updateAnnoymousBasketState] = useState<Product[]>([])

  const updateAnnoymousBasketFun = (basket : Product[]) => {
    updateAnnoymousBasketState(basket);
  }

  const [, updateLoggedInState] = useState<boolean>(false)

  const updateLoggedInFun = (loggedIn : boolean) => {
    updateLoggedInState(loggedIn);
  }


  return (
    <ShopContext.Provider value= {{isLoggedIn:false, updateLoggedIn: updateLoggedInFun, currentUser:user, updateCurrentUser: updateCurrentUserFun, 
    categories:categoryList, annoymousBasket:[], updateAnnoymousBasket: updateAnnoymousBasketFun}}>
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
    </ShopContext.Provider>
  );
}

export default App;

