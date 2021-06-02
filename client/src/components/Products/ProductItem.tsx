import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { addToBasketAPI } from '../../api/userAPI';
import { Product } from '../../api/Product';
import { ShopContext } from '../../context/ShoppingContext';

const  ProductItem = (props: any) => {

   const  shopContext = useContext(ShopContext)
   // check context
  if (!shopContext)
  throw(new Error("ShopContext is undefined!"))
  
   // deconstruct context to get shop
   const { isLoggedIn, user, updateCurrentUser, annonymousBasket, updateAnnoymousBasket } = shopContext

   const history = useHistory();

    function addToBasket(product: Product, pushToBasket : boolean) {
      if( isLoggedIn ){
         addToBasketAPI(product, user.email)
         .then((response) => {
            if(response.ok) {
               const newUser = {
                  customerName: user.customerName, 
                  email: user.email, 
                  password: user.password,
                  basket: user.basket.concat([product])
               }
               updateCurrentUser(newUser)
            } else {
               // element could not be added
               return false;
            }
         })} else {
            updateAnnoymousBasket(annonymousBasket.concat([product]))
         }
         if(pushToBasket) {
            history.push("/basket");
         }
         return true;
    }
    
    const product = props.product;
    return (
       <div key={product.tags} className="card">
          <div onClick={() => history.push({pathname:`/products/${product.tags}`, state: {product: product.tags}})}>
          <img
             className="product-image medium"
             src={`${product.img}`}
             alt={product.name}
          />
          </div>
          <div className="card-body">
             <div style={{fontWeight: 'bold'}} onClick={() => history.push({pathname:`/products/${product.tags}`, state: {product: product.tags}})}>{product.name}</div>
             <div className="product-brand" style={{color: 'LightSeaGreen', fontWeight: 'bold'}}>{product.name.split("-")[0] }</div>
             <div className="product-price" style={{fontWeight: 'bold'}}>{product.price}</div>
             <div>
             <button className="btn btn-outline-primary" style={{margin:"3px 3px 3px 3px", backgroundColor:"LightGreen", color:"black"}} onClick={() => addToBasket(product, false)}>Add to basket</button>
             <button className="btn btn-outline-primary" style={{margin:"3px 3px 3px 3px", backgroundColor:"LightSeaGreen", color:"black"}} onClick={() => addToBasket(product, true)}>Buy</button>
             </div>
             
          </div>
 
       </div>
    );
 }

export default ProductItem;