import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductItem from './ProductItem';


export const DetailedProduct = () => {
   //const {tags} = useParams()

const addToBasket = () => {
   
} 

const product = {
   name:"Cosrx - Pure Fit Cica Cream",
   price:"219 dkk",
   tags:"new-cosrx-combined-cream-pure-fit-cica",
   description:"Moisturising face cream that minimizes impurities, redness and acne scars",
   img:"images/products/cosrx-combined-cream-cosrx_-_pure_fit_cica_cream.jpg"
}

 return (
   <div>
    <h2>Detailed Product</h2>
    <div className="container">
      <div className="row">
            <div className="col-xs-3 item-photo" style={{maxWidth:"50%"}}>
               <img id="productImage"  src={product.img} />
            </div>
               <div className="col-xs-5" style={{border:"0px solid gray"}}>
                     <h3 id="productTitle">{product.name}</h3>    
                     <h4 id="productBrand" style={{color:"#337ab7"}}>{product.name.split("-")[0] }</h4>

                     <h4 className="title-price"><small>Price</small></h4>
                     <h3 id="productPrice" style={{marginTop:"0px"}}> {product.price} </h3>

                     <td className="actions">

                     <Link to={"/basket"}><button className="btn btn-lg btn-primary text-uppercase add" onClick={addToBasket}> Buy now </button></Link>
                     <button onClick={addToBasket} className="btn btn-lg btn-outline-primary text-uppercase add"> <i className="fas fa-shopping-cart"></i> Add to cart </button>                              
                     </td>
               </div>                              
            <div id="descriptionBox" className="col-xs-9">
               <div style={{width:"100%;"}}>
                  <p style={{padding:"15px;"}}>
                        <h4>Description</h4>
                  </p>
               </div>
               <div>
                  <p id="descriptionText">{product.description}</p>    
               </div>	
            </div>     
       </div>   
      </div>   
   </div>   
 );
};