import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { getProductWithIdAPI, Product, removeFromBasketAPI } from '../apiHelper';
import { ShopContext } from '../App';
import { Products } from './Products';


export const Basket = () => {
   
   const  shopContext = useContext(ShopContext)
   // check conext
   if (!shopContext)
      throw(new Error("ShopContext is undefined!"))
      
   // deconstruct context to get quiz
   const { isLoggedIn, currentUser, annoymousBasket } = shopContext;

   const basket = isLoggedIn ? currentUser.basket : annoymousBasket;

   const removeFromBasket = (tags: string) => {

   }

 return (
   <>
      <div className="hero is-primary">
        <div className="hero-body container">
            { currentUser === undefined ?
               <h4 className="title">My Basket</h4> :
               <h4 className="title">{currentUser.customerName}'s' Basket</h4>
            }
        </div>
      </div>
      <br />
      <div className="container">
        <div className="col-lg-12 pl-3 pt-3">
          <table className="table table-hover bg-white">
              <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
              </thead>
              <tbody id="productList" className="products">
              {basket.length ? (
                <div className="column columns is-multiline">
                  {basket.map(product => (
                      <div className=" column">
                      <div className="box">
                        <div className="media">
                          <div className="media-left">
                            <figure className="image is-64x64">
                              <img
                                src={product?.img}
                                alt={product?.name}
                              />
                            </figure>
                          </div>
                          <div className="media-content">
                            <b style={{ textTransform: "capitalize" }}>
                              {product?.name}{" "}
                            </b>
                            <small>{product?.price}</small>
                          </div>
                          <div
                            className="media-right"
                            onClick={() => removeFromBasket(product.tags)}>
                            <span className="delete is-large"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    ))}
                    <div className="column is-12 is-clearfix">
                      <br />
                      <div className="is-pulled-right">
                        <button
                          className="button is-success">
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="column">
                    <div className="title has-text-grey-light">No item in cart!</div>
                  </div>
                )}
              </tbody>
              <tfoot>
              <tr>
                <th>Total</th>
                <th></th>
              </tr>
              <tr>
                <td><Link to={"/home"}> <button className="btn btn-warning text-white"><i className="fa fa-angle-left"></i> Continue Shopping</button></Link></td>
                <td className="hidden-xs text-center" style={{width:"10%;"}}><strong id="totalPrice"></strong></td>
                <td><button className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></button></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
 )};
