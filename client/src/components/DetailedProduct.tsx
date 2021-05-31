import { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getProductWithIdAPI, addToBasketAPI, Product } from '../apiHelper';
import { ShopContext } from '../ShoppingContext';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export const DetailedProduct = (props : any) => {

   const  shopContext = useContext(ShopContext)
   // check conext
  if (!shopContext)
  throw(new Error("QuizContext is undefined!"))
  
   // deconstruct context to get quiz
   const { isLoggedIn, user, updateCurrentUser, annonymousBasket, updateAnnoymousBasket } = shopContext

   const history = useHistory()

   const productID : string = props.match.params.productID

   const [product, setProduct] = useState<Product>({name: "", price: "", tags: "", img: "", description: ""});
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   const addToBasket = () => {
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
            }
         })
      } 
      else 
      {
            updateAnnoymousBasket(annonymousBasket.concat([product]));
      }
   }
      

   useEffect(() => { 
      setLoading(true);
      getProductWithIdAPI(productID)
      .then((data)=> {
         setLoading(false);
         setProduct(data);
         // console.log(product)
      }).catch((e) => {
         setError(e.message);
         setLoading(false);
      })
   },[productID])

 return (
   <Container>
      <div>
            {loading ? (<LoadingBox></LoadingBox>)
            :
               error? (<MessageBox variant="danger">{error}</MessageBox> )
            : (
               <div>
                  <div>
                     <div style={{textAlign:"left"}}>
                     <div onClick={()=> history.push("/products")}> <Button style={{ backgroundColor:"grey", margin:"8px 4px 8px 4px"}} className="primary block">Go to products</Button></div>
                     </div>
                     <div key={product?.tags} style={{display: "flex"}} className="row">
                              <div className="column" style={{flex: "50%"}}>
                                 <img
                                    className="detailedProduct"
                                    src={`${product.img}`}
                                    alt={product.name}
                                 />
                              </div>

                              <div className="column" style={{flex: "50%"}}>
                                 <ul style={{listStyleType:"none"}}>
                                    <li style={{marginTop:"1rem"}}>
                                       <h2>{product.name}</h2>
                                    </li>
                                    <li style={{marginTop:"1rem"}}>
                                       <h3>{product.price}</h3>
                                    </li>
                                    <li style={{marginTop:"1rem"}}>
                                       <h3>Description</h3>
                                       <p>{product.description }</p>
                                    </li>
                                    <li style={{marginTop:"1rem"}}>
                                       <Button className="primary block" onClick={addToBasket}>Add to basket</Button>
                                    </li>
                                 </ul>
                              </div> 
                        </div> 
                     </div>
                  </div>
               )}
      </div>
   </Container>   
 );
};

