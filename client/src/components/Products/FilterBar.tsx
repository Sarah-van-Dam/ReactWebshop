import { useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Category } from "../../api/Category";
import { ShopContext } from '../../context/ShoppingContext';

const filterBarStyle = {
    display: 'flex',
    alignItems: 'center',
 
  };
 
 const FilterBar = () => {
   
   const  shopContext = useContext(ShopContext)
   // check conext
  if (!shopContext)
  throw(new Error("shopContext is undefined!"))
  
   // deconstruct context to get shop
   const { categories } = shopContext
   const [filter, updateFilter] = useState<Category[]>([{Id:"skintype", types: []}, {Id:"producttype", types: []}, {Id:"brand", types: []}]);



   //  const filterProducts = (event: React.ChangeEvent) => {
   //     if()
   //     let filterType = event.target.id;
   //     console.log(filterType)
   //     let temp = []
   //    // filter.forEach(element => {
   //    //    let currentTypes = []
   //    //    if(element.Id === filterId) {
   //    //       currentTypes.push
   //    //    }
   //    //    temp.push({Id:`${element.Id}`, types: []})
   //    // });
   //    // postFilteredProductsAPI(categories : Category[])
 
   //    return undefined
   //  }
 
 
    return (
         <div style={filterBarStyle} >
               <div className="card" style={{maxWidth:"60rem"}}>
                <Row>
                  <Col style={{width:"80%"}}>
                  <h5>Product Type:</h5>
                  <div>Cleanser: <input type="checkbox" name="cleanser" id="cleanser"  /></div>
                  <div>Toner: <input type="checkbox" name="toner" id="toner" /></div>
                  <div>Serum: <input type="checkbox" name="serum" id="serum" /></div>
                  <div>Mask: <input type="checkbox" name="mask" id="mask" /></div>
                  <div>Cream: <input type="checkbox" name="cream" id="cream" /></div>
                  </Col>
                  <Col style={{width:"80%"}}>
                  <h5>Skin Type:</h5>
                  <div>Dry: <input type="checkbox" name="dry" id="dry" /></div>
                  <div>Oily: <input type="checkbox" name="oily" id="oily" /></div>
                  <div>Combined: <input type="checkbox" name="combined" id="combined" /></div>
                  <div>Sensitive: <input type="checkbox" name="sensitive" id="sensitive" /></div>
                  </Col>
                  <Col style={{width:"80%"}}>
                  <h5>Brand:</h5>
                  <div>CosRX: <input type="checkbox" name="cosrx" id="cosrx" /></div>
                  <div>Dr. Jart+: <input type="checkbox" name="dr. jart+" id="dr. jart+" /></div>
                  <div>Mizon: <input type="checkbox" name="mizon" id="mizon" /></div>
                  <div>Nature Republic: <input type="checkbox" name="nature republic" id="nature republic" /></div>
                  </Col>
                </Row>

               </div>
                
         </div>
    )
 }

export default FilterBar;