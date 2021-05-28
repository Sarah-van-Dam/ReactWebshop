import React, { useContext, useEffect, useState} from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { getProductsByCategoryAPI, Product } from '../apiHelper';
import { ShopContext } from '../App';
import Carousel from './Carousel';


export const Home = () => {

   // const newProducts = getNewProducts();
   // const discountProducts = getDiscountProducts();
   
   const  shopContext = useContext(ShopContext)
   //console.log(shopContext)
   // check conext
   if (!shopContext)
   throw(new Error("ShopContext is undefined!"))

   const { currentUser, isLoggedIn } = shopContext;   
   const [newProducts, setNewProducts] = useState<Product[]>([]);
   const [discountProducts, setDiscountProducts] = useState<Product[]>([]);

   const history = useHistory();

   useEffect( () => {
      getProductsByCategoryAPI("new")
      .then((data)=> {
         //console.log(data)
         setNewProducts(data);
      }).catch((e) => {
      })

      getProductsByCategoryAPI("discount")
      .then((data)=> {
         //console.log(data)
         setDiscountProducts(data);
      }).catch((e) => {
      })
   }, []);
   
 return (
   <Container>
      {isLoggedIn === false ? 
         (<h1 style={{textAlign:"left"}}>Welcome to Pibu Care</h1>) : 
         (<h1 style={{textAlign:"left"}}>Welcome to Pibu Care, {currentUser.customerName}</h1>)
      }
      <h2 style={{marginTop:"50px", marginBottom:"20px"}}> New Products </h2>
      <Carousel>
         {newProducts.map((el) => (
               <Link key={el.tags} to={{pathname:"/products/"+el.tags, state: {product: el.tags} }}><img key={el.tags} className="big" src={el.img} alt={el.tags} /></Link>
            ))} 
      </Carousel>
      <h2 style={{marginTop:"50px", marginBottom:"20px"}}>Discounted Products</h2>
      <Carousel>
            {discountProducts.map((el) => (
               <Link key={el.tags} to={{pathname:"/products/"+el.tags, state: {product: el.tags} }}><img key={el.tags} className="big" src={el.img} alt={el.tags} /></Link>
            ))}
      </Carousel>
   </Container>
 );
};