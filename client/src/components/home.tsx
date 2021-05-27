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

   // check conext
   if (!shopContext)
   throw(new Error("ShopContext is undefined!"))

   const { currentUser } = shopContext;   
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

   
   function getNewProducts() {
      throw new Error('Function not implemented.');
   }
   

   
 return (
   <Container>
      {currentUser === undefined ? 
         (<h1 style={{textAlign:"left"}}>Welcome to Pibu Care</h1>) : 
         (<h1 style={{textAlign:"left"}}>Welcome to Pibu Care, {currentUser.name}</h1>)
      }
      <h2 style={{marginTop:"50px", marginBottom:"20px"}}> New Products </h2>
      <Carousel>
         {newProducts.map((el, index) => (
               <Link to={`/products/${el.tags}`}><img className="big" src={el.img} alt={el.tags} /></Link>
            ))} 
      </Carousel>
      <h2 style={{marginTop:"50px", marginBottom:"20px"}}>Discounted Products</h2>
      <Carousel>
            {discountProducts.map((el, index) => (
               <Link to={`/products/${el.tags}`}><img className="big" src={el.img} alt={el.tags} /></Link>
            ))}
      </Carousel>
   </Container>
 );
};

// const addUserName() {
   //    const name = localStorage.name;
   //    if (name !== undefined) {
   //      document.getElementById("message").innerHTML =
   //        "Welcome to Pibu Care, " + name +"!";
   //    }
   //  }

   //  const displayNewProducts(array) {
   //      var slides = document.getElementsByName('itemNew');
   //      for (let i = 0; i < slides.length; i++) {
   //          slides[i].src = array[i].img;
   //          //slide[i].href = "detailedProducts.html?name="+array[i].img;
   //      }
   //  }

   //  const displayDiscountProducts(array) {
   //      var slides = document.getElementsByName('itemSale');
   //        for (let j = 0; j < array.length; j++) {
   //          slides[j].src = array[j].img;
   //          //slide[i].href = "detailedProducts.html?name="+array[j].img;
   //      }
   //  }

   // $("document").ready(function() {
   //    //let name = "images/products/cosrx-combined-cream-cosrx_-_pure_fit_cica_cream.jpg";
   //    //document.getElementById("testLink").setAttribute("href", "detailedProducts.html?name="+name)
   //    // Get data from json
   //    let data = JSON.parse(DATA);
   //    console.log("ready!")

   //    NewProducts = new Array();
   //    DiscountProducts = new Array();

   //    data.products.forEach(product => {
   //      if(product.tags.includes("new"))
   //        NewProducts.push(product);
   //      if(product.tags.includes("discount"))
   //        DiscountProducts.push(product);
   //    });
   //    addUserName();
   //    displayNewProducts(NewProducts);
   //    displayDiscountProducts(DiscountProducts);
   //  });