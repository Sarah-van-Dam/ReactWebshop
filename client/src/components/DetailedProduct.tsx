import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, RouteComponentProps, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProductWithIdAPI, addToBasketAPI, Product } from '../apiHelper';
import { ShopContext } from '../App';
import { Basket } from './Basket';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import ProductItem from './ProductItem';

export const DetailedProduct = (props : any) => {

   const  shopContext = useContext(ShopContext)
   // check conext
  if (!shopContext)
  throw(new Error("QuizContext is undefined!"))
  
   // deconstruct context to get quiz
   const { isLoggedIn, currentUser, updateCurrentUser, annoymousBasket, updateAnnoymousBasket } = shopContext


   const productID : string = props.match.params.productID
   //console.log(productID)
   const dummy : Product = {name: "", price: "", tags: "", img: "", description: ""};
   //console.log(productID)

   const [product, setProduct] = useState<Product>({name: "", price: "", tags: "", img: "", description: ""});
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   const addToBasket = () => {
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
            }
         })} else {
            annoymousBasket.push(product)
         }
      }
      

   useEffect(() => { 
      setLoading(true);
      getProductWithIdAPI(productID)
      .then((data)=> {
         setLoading(false);
         setProduct(data);
         console.log(product)
      }).catch((e) => {
         setError(e.message);
         setLoading(false);
      })
   },[])

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
                     <Link to="/products"> <Button style={{ backgroundColor:"grey", margin:"8px 4px 8px 4px"}} className="primary block">Back to products</Button></Link>
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
                                       <Button className="primary block" onClick={()=> addToBasket}>Add to basket</Button>
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

