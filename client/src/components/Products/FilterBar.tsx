import { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ShopContext } from '../../context/ShoppingContext';
import { capitalizeEachWordInString } from '../../helpers/helperFunctions';

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
   const { categories, filterCategories, setFilterCategories } = shopContext

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
 
   let productTypes = categories.find(c => c.Id === "producttype");
   let skinTypes = categories.find(c => c.Id === "skintype");
   let brands = categories.find(c => c.Id === "brand");

    const onChangeFilter = (checked : boolean, type: string, id: string) => {
      let updatedFilter = filterCategories.map((item, idx) => item);
         if(checked){
            updatedFilter.find(c => c.Id === id )?.types.push(type);
            setFilterCategories(updatedFilter);
         } else {
            let types = updatedFilter.find(c => c.Id === id)?.types;
            if( types !== undefined) {
               let newTypes : string[] = types.filter(item => item !== type);
               updatedFilter.map(item => item.Id === id ? item.types = newTypes : item.types)
               setFilterCategories(updatedFilter);
            }
         }
    }

    const isTypeChecked = (type: string, id: string) => {
       let isInFilteredCategories = filterCategories.find(item => item.Id === id)?.types.includes(type);
       if(isInFilteredCategories) {
          return true;
       } else {
          return false;
       }
    }


 
    return (
         <div style={filterBarStyle} >
               <div className="card" style={{maxWidth:"60rem"}}>
                <Row>
                  <Col style={{width:"80%"}}>
                  <h5>Product Type:</h5>
                  {
                     productTypes?.types.map((item, idx) => (
                        <div key={idx}>
                        { (() => 
                           {
                              if (isTypeChecked(item, "producttype")) {
                                 return (<div key={item +"1"}>{capitalizeEachWordInString(item)}: <input checked type="checkbox" name="item" id="item" onChange={(event) => onChangeFilter(event.target.checked, item, "producttype")}/></div>)
                              } else {
                                 return (<div key={item+"2"}>{capitalizeEachWordInString(item)}: <input type="checkbox" name="item" id="item" onChange={(event) => onChangeFilter(event.target.checked, item, "producttype")}/></div>)
                              }
                           })()
                        }
                        </div>
                     ))
                  }
                  </Col>
                  <Col style={{width:"80%"}}>
                  <h5>Skin Type:</h5>
                  {
                     skinTypes?.types.map((item, idx) => (
                        <div key={idx}>
                        { (() => 
                           {
                              if (isTypeChecked(item, "skintype")) {
                                 return (<div key={item +"1"}>{capitalizeEachWordInString(item)}: <input checked type="checkbox" name="item" id="item" onChange={(event) => onChangeFilter(event.target.checked, item, "skintype")}/></div>)
                              } else {
                                 return (<div key={item+"2"}>{capitalizeEachWordInString(item)}: <input type="checkbox" name="item" id="item" onChange={(event) => onChangeFilter(event.target.checked, item, "skintype")}/></div>)
                              }
                           })()
                        }
                        </div>
                        ))
                  }
                  </Col>
                  <Col style={{width:"80%"}}>
                  <h5>Brand:</h5>
                  {
                     brands?.types.map((item, idx) => (
                        <div key={idx}>
                        { (() => 
                           {
                              if (isTypeChecked(item, "brand")) {
                                 return (<div key={item +"1"}>{capitalizeEachWordInString(item)}: <input checked type="checkbox" name="item" id="item" onChange={(event) => onChangeFilter(event.target.checked, item, "brand")}/></div>)
                              } else {
                                 return (<div key={item+"2"}>{capitalizeEachWordInString(item)}: <input type="checkbox" name="item" id="item" onChange={(event) => onChangeFilter(event.target.checked, item, "brand")}/></div>)
                              }
                           })()
                        }
                        </div>
                        ))
                  }
                  </Col>
                </Row>
               </div>
                
         </div>
    )
 }

export default FilterBar;