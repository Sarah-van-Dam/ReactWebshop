import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardDeck, Col, Container, Dropdown, ListGroup, Nav, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addToBasketAPI, getProductsAPI, Product,  } from '../apiHelper';
import { ShopContext } from '../App';
import FilterBar from './FilterBar';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import ProductItem from './ProductItem';


export const Products = () => {
   const  shopContext = useContext(ShopContext)
   // check conext
  if (!shopContext)
  throw(new Error("QuizContext is undefined!"))
  
   // deconstruct context to get quiz
   const { currentUser, categories, annoymousBasket } = shopContext

   const [products, setProducts] = useState<Product[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   useEffect( () => {
      setLoading(true);
      getProductsAPI()
      .then((data)=> {
         //console.log(data)
         setLoading(false);
         setProducts(data);
      }).catch((e) => {
         setError(e.message);
         setLoading(false);
      })

   }, []);

 return (
    <Container>
       <Row>
         <h2>Products</h2>
      </Row>
      <Row>
         <FilterBar></FilterBar>
      </Row>
      <Row>
         <div>
            {loading ? (<LoadingBox></LoadingBox>)
            :
               error? (<MessageBox variant="danger">{error}</MessageBox> )
            : (
            <div className="row center">
                  {products.map((product) => (
                     <ProductItem key={product.tags} product={product}></ProductItem>
                  ))}
            </div> 
            )}
         </div>
      </Row>
    </Container>
 );
};
