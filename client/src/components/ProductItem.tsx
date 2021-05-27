import React from 'react';
import { Link } from 'react-router-dom';

const  ProductItem = (props: any) => {

    const addToBasket = (tags: string) => {
       // like
       return undefined;
    }
    
    const buy = (tags: string) => {
       return undefined;
    }
 
    const product = props.product;
    return (
       <div key={product.tags} className="card">
          <Link to={`/products/${product.tags}`}>
          <img
             className="product-image medium"
             src={process.env.PUBLIC_URL + product.img}
             alt={product.name}
          />
          </Link>
          <div className="card-body">
             <Link to={`/products/${product.tags}`}>{product.name}</Link>
             <div className="product-brand">{product.name.split("-")[0] }</div>
             <div className="product-price">{product.price}</div>
             <button className="btn btn-outline-primary" style={{margin:"3px 3px 3px 3px"}} onClick={addToBasket(product.tags)}>Add to basket</button>
             <button className="btn btn-outline-primary" style={{margin:"3px 3px 3px 3px"}}>Buy</button>
          </div>
 
       </div>
    );
 }

export default ProductItem;