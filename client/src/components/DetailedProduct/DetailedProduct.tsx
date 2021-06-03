import { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { addToBasketAPI } from '../../api/userAPI';
import { getProductWithIdAPI } from "../../api/productAPI";
import { ShopContext } from '../../context/ShoppingContext';
import LoadingBox from '../shared/LoadingBox';
import MessageBox from '../shared/MessageBox';
import { Product } from '../../api/types/Product';

export const DetailedProduct = (props : any) => {

   const  shopContext = useContext(ShopContext)
   // check conext
  if (!shopContext)
  throw(new Error("ShopContext is undefined!"))
  
   // deconstruct context to get quiz
   const { isLoggedIn, user, updateCurrentUser, anonymousBasket, updateAnoymousBasket } = shopContext

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
            updateAnoymousBasket(anonymousBasket.concat([product]));
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
                     <Row style={{textAlign:"left"}}>
                     <div onClick={()=> history.push("/products")}> <Button style={{ backgroundColor:"grey", margin:"8px 4px 8px 4px"}} className="primary block">Go to products</Button></div>
                     </Row>
                     <Row key={product?.tags} style={{display: "flex"}} className="row">
                              <Col className="column" style={{flex: "50%"}}>
                                 <img
                                    className="detailedProduct"
                                    src={`${product.img}`}
                                    alt={product.name}
                                 />
                              </Col>

                              <Col className="column" style={{flex: "50%"}}>
                                 <ul style={{listStyleType:"none"}}>
                                    <li style={{marginTop:"1rem"}}>
                                       <h2 style={{fontWeight: 'bold'}}>{product.name}</h2>
                                    </li>
                                    <li>
                                       <h3 className="product-brand" style={{color: 'LightSeaGreen', fontWeight: 'bold'}}>{product.name.split("-")[0] }</h3>
                                    </li>
                                    <li style={{marginTop:"1rem"}}>
                                       <h4>{product.price}</h4>
                                    </li>
                                    <li style={{marginTop:"1rem"}}>
                                       <Button className="primary block" style={{backgroundColor:"LightGreen", color:"black"}} onClick={addToBasket}>Add to basket</Button>
                                    </li>
                                 </ul>
                              </Col> 
                     </Row>
                     <Row>
                        <h3>Description</h3>
                     </Row>
                     <Row>
                        <div>{product.description }</div>
                     </Row>
                  </div>
               )}
      </div>
   </Container>   
 );
};

