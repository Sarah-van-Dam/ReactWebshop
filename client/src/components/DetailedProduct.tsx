import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, RouteComponentProps, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProductsAPI, getProductWithIdAPI, Product } from '../apiHelper';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import ProductItem from './ProductItem';

export const DetailedProduct = (props : any) => {

   const productID = props.match.params.productID
   //console.log(productID)

   const [product, setProduct] = useState<Product>({name:"", price: "", tags: "", description: "", img: ""});
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   const addToBasket = () => {
      
   } 

   useEffect(() => { 
      setLoading(true);
      getProductsAPI()
      .then((data)=> {
         console.log(data)
         const currentProduct = data.find((x: Product) => x.tags === productID);
         setProduct(currentProduct);
         setLoading(false);
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
               <Row>
                  <Col >
                     <div className="card">
                     <img
                        className="big"
                        src={product.img}
                        alt={product.name}
                     />
                     {console.log(product.img)}
                     </div>
                  </Col>

                  <Col className="col-1">
                     <ul>
                        <li>
                           <h2>{product.name}</h2>
                        </li>
                        <li>

                        </li>
                     </ul>
                  </Col>
               </Row>
            )}
      </div>
   </Container>   
 );
};