import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory} from 'react-router-dom';
import { Product } from '../../api/types/Product';
import { removeFromBasketAPI } from '../../api/userAPI';
import { ShopContext } from '../../context/ShoppingContext';
import MessageBox from '../shared/MessageBox';


export const Basket = () => {
   
   const  shopContext = useContext(ShopContext)
   // check conext
   if (!shopContext)
      throw(new Error("ShopContext is undefined!"))
      
   // deconstruct context
   const { isLoggedIn, user, updateCurrentUser, anonymousBasket, updateAnoymousBasket } = shopContext;

   const [basket, updateBasket] = useState<Product[]>([]);

   const [error, setError] = useState("");

   const history = useHistory();

   useEffect( ()=> {
    if(isLoggedIn) {
      updateBasket(user.basket)
    } else {
      updateBasket(anonymousBasket);
    } 
   }, [user.basket, anonymousBasket, isLoggedIn])
    
   const removeFromBasket = (product: Product) => {
    let updatedBasket = basket.map((item, idx) => item);
    let index = updatedBasket.findIndex(o => o.tags === product.tags);
    updatedBasket.splice(index, 1);
    if (isLoggedIn) {
      removeFromBasketAPI(product, user.email)
      .then((response) => {
         if(response.ok) {
            const newUser = {
               customerName: user.customerName, 
               email: user.email, 
               password: user.password,
               basket: updatedBasket
            }
            updateCurrentUser(newUser)
            updateBasket(updatedBasket)
         } else {
            // element could not be added
            setError(`Product ${product.name} could not be removed`);
            return false;
         }
      })
    } else {
      updateAnoymousBasket(updatedBasket)
      updateBasket(updatedBasket)
    }
   }

   const renderBasket = (basket: Product[]) => {
    return (
      <div>
      {basket.map((item, index) => (
        <li key={item.tags + " "+ index.toString()} style={{listStyleType:"none"}}>
          <Row className="row" style={{ msFlexDirection:"row", flexBasis:"content center", border: "0.1rem #c0c0c0 solid", backgroundColor: "#f8f8f8",
            borderRadius: "0.5rem", margin: "1rem", minHeight:"10rem", flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Col className="col is-64x64" onClick={() => history.push({pathname:`/products/${item.tags}`, state: {product: item.tags}})}>
              <img
                src={item.img}
                alt={item.name}
                className="medium">
                </img>
            </Col>
            <Col className="col min-30" style={{alignContent:"center"}}>
              <h6 style={{verticalAlign:"center"}}>{item.name}</h6>
            </Col>
            <Col className="col">
              <h6>{item.price}</h6>
            </Col>
            <Col className="col">
              <button
                className="btn btn-success"
                style={{backgroundColor:"MediumTurquoise", borderColor:"white", textAlign: "center"}}
                type="button"
                onClick={() => removeFromBasket(item)}>
                Delete
              </button>
              {error.length !== 0 ? <span style={{color: "red"}}>{error}</span> : null}
            </Col>
          </Row>
        </li>
      ))}
      </div>
    )
  } 

  const renderGoToCheckout = (backet: Product[]) => {
    return(
    <ul>
              {renderBasket(basket)}
              <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col><button className="btn btn-success">Checkout <i className="fa fa-angle-right"></i></button></Col>
              </Row>
            </ul>
    )
  }

 return (
   <Container>
      <Container>
        <Row>
        { !isLoggedIn ?
               <h2>Basket</h2> :
               <h2>{user.customerName}'s Basket</h2>
            }
        </Row>
      </Container>
      <br />
      <Container>
        <div >
          {basket.length === 0 ? (
            <MessageBox>
              <h4>Basket is empty. </h4> 
              <button className="btn btn-success" onClick={() => history.push("/")}>Go Shopping</button>
            </MessageBox>
          ) : renderGoToCheckout(basket)
          }
        </div>
      </Container>
    </Container>
 )};


