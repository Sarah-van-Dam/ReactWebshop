import React, { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { getProductsAPI, postFilteredProductsAPI } from "../../api/productAPI";
import { ShopContext } from '../../context/ShoppingContext';
import MessageBox from '../shared/MessageBox';
import LoadingBox from '../shared/LoadingBox';
import { Product } from '../../api/types/Product';
import { FilterBar } from './FilterBar';
import { ProductItem } from './ProductItem';


export const Products = () => {
   const  shopContext = useContext(ShopContext)
   // check context
  if (!shopContext)
  throw(new Error("ShopContext is undefined!"))
  
   const [products, setProducts] = useState<Product[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   
   useEffect( () => {
         
         setLoading(true);
         if(!shopContext.isFilterSet()){
         getProductsAPI()
         .then((data)=> {
            setLoading(false);
            setProducts(data);
         }).catch((e) => {
            setError(e.message);
            setLoading(false);
         })
      } else{
         
         postFilteredProductsAPI(shopContext.filterCategories)
         .then((data) => {
            setLoading(false);
            setProducts(data);
         }).catch((e) => {
            setError(e.message);
            setLoading(false);
         })
      }
   }, [shopContext]);
   

   const isNoProducts = () : boolean => {
      return products.length > 0;
   }

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
               error.length > 0 ? (<MessageBox variant="danger">{error}</MessageBox> )
            : (
               <div>
               { (() => {
                     if (isNoProducts()) { 
                        return (
                           <div className="row center">
                              {products.map((product : Product) => (
                                 <ProductItem key={product.tags} product={product}></ProductItem>
                              ))}
                           </div>)
                     } else {
                        return (
                           <MessageBox variant="info">There was no products matching all filters.</MessageBox> 
                        )
                     }
                  })()
               }
               </div>
            )}
         </div>
      </Row>
    </Container>
 );
};
