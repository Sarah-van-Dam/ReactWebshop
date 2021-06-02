import { useContext, useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { getProductsAPI, postFilteredProductsAPI } from "../../api/productAPI";
import { Product } from "../../api/Product";
import { ShopContext } from '../../context/ShoppingContext';
import FilterBar from './FilterBar';
import MessageBox from '../shared/MessageBox';
import ProductItem from './ProductItem';
import LoadingBox from '../shared/LoadingBox';


export const Products = () => {
   const  shopContext = useContext(ShopContext)
   // check context
  if (!shopContext)
  throw(new Error("ShopContext is undefined!"))
  
   // deconstruct context to get shop

   const [products, setProducts] = useState<Product[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   
   useEffect( () => {
         
         setLoading(true);
         if(!shopContext.isFilterSet()){
         getProductsAPI()
         .then((data)=> {
            //console.log(data)
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
               error ? (<MessageBox variant="danger">{error}</MessageBox> )
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
