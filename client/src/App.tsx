import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Products } from './components/Products/Products';
import { DetailedProduct } from './components/DetailedProduct/DetailedProduct';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Basket } from './components/Basket/Basket';
import { Home } from './components/Home/Home';
import { Header } from './components/shared/Header';
import { Footer } from './components/shared/Footer';


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

