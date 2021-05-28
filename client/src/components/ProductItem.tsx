import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { addToBasketAPI, Product } from '../apiHelper';
import { ShopContext } from '../App';

const  ProductItem = (props: any) => {

   const  shopContext = useContext(ShopContext)
   // check conext
  if (!shopContext)
  throw(new Error("QuizContext is undefined!"))
  
   // deconstruct context to get quiz
   const { isLoggedIn, currentUser, updateCurrentUser, annoymousBasket, updateAnnoymousBasket } = shopContext

   const history = useHistory();

    function addToBasket(product: Product, pushToBasket : boolean) {
      if( isLoggedIn ){
         addToBasketAPI(product.tags, currentUser.email)
         .then((responce) => {
            if(responce.ok) {
               const user = {
                  customerName: currentUser.customerName, 
                  email: currentUser.email, 
                  password: currentUser.password,
                  basket: currentUser.basket.concat([product])
               }
               updateCurrentUser(user)
            } else {
               // element could not be added
               return false;
            }
         })} else {
            updateAnnoymousBasket(annoymousBasket.concat([product]))
         }
         if(pushToBasket) {
            history.push("/basket");
         }
         return true;
    }
    
    const buy = (tags: string) => {
       return undefined;
    }
 
    const product = props.product;
    return (
       <div key={product.tags} className="card">
          <Link to={{pathname:"/products/"+product.tags, state: {product: product.tags} }}>
          <img
             className="product-image medium"
             src={`${product.img}`}
             alt={product.name}
          />
          </Link>
          <div className="card-body">
             <Link to={{pathname:"/products/"+product.tags, state: {product: product.tags} }}>{product.name}</Link>
             <div className="product-brand">{product.name.split("-")[0] }</div>
             <div className="product-price">{product.price}</div>
             <button className="btn btn-outline-primary" style={{margin:"3px 3px 3px 3px"}} onClick={() => addToBasket(product, false)}>Add to basket</button>
             <button className="btn btn-outline-primary" style={{margin:"3px 3px 3px 3px"}} onClick={() => addToBasket(product, true)}>Buy</button>
          </div>
 
       </div>
    );
 }

export default ProductItem;