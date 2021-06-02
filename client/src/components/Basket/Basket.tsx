import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory} from 'react-router-dom';
import { removeFromBasketAPI } from '../../api/apiHelper';
import { Product } from "../../api/Product";
import { ShopContext } from '../../context/ShoppingContext';
import MessageBox from '../shared/MessageBox';


export const Basket = () => {
   
   const  shopContext = useContext(ShopContext)
   // check conext
   if (!shopContext)
      throw(new Error("ShopContext is undefined!"))
      
   // deconstruct context to get shop
   const { isLoggedIn, user, updateCurrentUser, annonymousBasket, updateAnnoymousBasket } = shopContext;

   const [basket, updateBasket] = useState<Product[]>([]);
   //const [sum, updateSum] = useState<number>(0);

   const [error, setError] = useState("");

   const history = useHistory();

   useEffect( ()=> {
    if(isLoggedIn) {
      updateBasket(user.basket)
    } else {
      updateBasket(annonymousBasket);
    } 
    // let runningSum = 0;
    // basket.forEach((item) => {
    //   runningSum = runningSum + parseInt(item.price.split(" ")[0]);
    // })
    //updateSum(runningSum)
   }, [user.basket, annonymousBasket, isLoggedIn])
    
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
            //updateSum((prev) => prev - parseInt(product.price.split(" ")[0]))
         } else {
            // element could not be added
            setError(`Product ${product.name} could not be removed`);
            return false;
         }
      })
    } else {
      updateAnnoymousBasket(updatedBasket)
      updateBasket(updatedBasket)
      //updateSum((prev) => prev - parseInt(product.price.split(" ")[0]))
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
              <h6>{item.price}
              {/* {updateSum((prev) => prev + parseInt(item.price.split(" ")[0]))} */}
              </h6>
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
                <Col> 
                {/* <div>Total: {sum}</div> */}
                </Col>
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



//  <table className="table table-hover bg-white">
//  <thead>
//      <tr>
//        <th>Product</th>
//        <th>Price</th>
//        <th>Action</th>
//      </tr>
//  </thead>
//  <tbody id="productList" className="products">
//  {basket.length ? (
//    <div className="column columns is-multiline">
//      {basket.map(product => (
//          <div key={product.tags} className=" column">
//          <div className="box">
//            <div className="media">
//              <div className="media-left" >
//                <figure className="image is-64x64">
//                  <img
//                  className="medium"
//                    src={product.img}
//                    alt={product.name}
//                  />
//                </figure>
//              </div>
//              <div className="media-content">
//                <b style={{ textTransform: "capitalize" }}>
//                  {product.name}{" "}
//                </b>
//                <small>{product.price}</small>
//              </div>
//              <div
//                className="media-right"
//                onClick={() => removeFromBasket(product)}>
//                <span className="delete is-large"></span>
//              </div>
//            </div>
//          </div>
//        </div>
//        ))}
//        <div className="column is-12 is-clearfix">
//          <br />
//        </div>
//      </div>
//    ) : (
//      <div className="column">
//        <div className="title has-text-grey-light">No item in cart!</div>
//      </div>
//    )}
//  </tbody>
//  <tfoot>
//  <tr>
//    <th>Total</th>
//    <th></th>
//  </tr>
//  <tr>
//    <td><Link to={"/home"}> <button className="btn btn-warning text-white"><i className="fa fa-angle-left"></i> Continue Shopping</button></Link></td>
//    <td className="hidden-xs text-center" style={{width:"10%"}}><strong id="totalPrice"></strong></td>
//    <td><button className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></button></td>
//  </tr>
// </tfoot>
// </table>