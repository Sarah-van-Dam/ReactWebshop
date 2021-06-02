import { useContext, useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ShopContext } from '../../context/ShoppingContext';
import { getProductsByCategoryAPI } from "../../api/categoryAPI";
import { Product } from "../../api/Product";
import Carousel from './Carousel';


export const Home = () => {

   // const newProducts = getNewProducts();
   // const discountProducts = getDiscountProducts();
   
   const  shopContext = useContext(ShopContext)
   //console.log(shopContext)
   // check conext
   if (!shopContext)
   throw(new Error("ShopContext is undefined!"))

   const history = useHistory()

   const { user, isLoggedIn } = shopContext;   
   const [newProducts, setNewProducts] = useState<Product[]>([]);
   const [discountProducts, setDiscountProducts] = useState<Product[]>([]);

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
         (<h1 style={{textAlign:"left"}}>Welcome to Pibu Care, {user.customerName}</h1>)
      }
      {/* {console.log(shopContext)} */}
      <h2 style={{marginTop:"50px", marginBottom:"20px"}}> New Products </h2>
      <Carousel>
         {newProducts.map((el) => (
               <div key={el.tags} onClick={() => history.push({pathname:`/products/${el.tags}`, state: {product: el.tags}})}><img key={el.tags} className="big" src={el.img} alt={el.tags} /></div>
            ))} 
      </Carousel>
      <h2 style={{marginTop:"50px", marginBottom:"20px"}}>Discounted Products</h2>
      <Carousel>
            {discountProducts.map((el) => (
               <div key={el.tags} onClick={() => history.push({pathname:`/products/${el.tags}`, state: {product: el.tags}})}><img key={el.tags} className="big" src={el.img} alt={el.tags} /></div>
            ))}
      </Carousel>
   </Container>
 );
};
