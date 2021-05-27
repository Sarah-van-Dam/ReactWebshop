import React from 'react';
import { Dropdown } from 'react-bootstrap';

const filterBarStyle = {
    display: 'flex',
    alignItems: 'center',
 
  };
 
 const FilterBar = () => {
 
 
    const filter_products = (filterValue: string) => {
 
 
       return undefined
    }
 
 
    return (
         <div style={filterBarStyle} >
             <Dropdown style={{margin:"8px 4px 8px 4px"}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                   Product Type
                </Dropdown.Toggle>
                <Dropdown.Menu>
                   <Dropdown.Item onClick={filter_products("cleanser")}>Cleanser</Dropdown.Item>
                   <Dropdown.Item onClick={filter_products("toner")}>Toner</Dropdown.Item>
                   <Dropdown.Item onClick={filter_products("serum")}>Serum</Dropdown.Item>
                   <Dropdown.Item onClick={filter_products("mask")}>Mask</Dropdown.Item>
                   <Dropdown.Item onClick={filter_products("cream")}>Cream</Dropdown.Item>
                </Dropdown.Menu>
             </Dropdown>
             <Dropdown style={{margin:"8px 4px 8px 4px"}}>
                   <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Skin Type
                   </Dropdown.Toggle>
                   <Dropdown.Menu>
                      <Dropdown.Item onClick={filter_products("dry")}>Dry</Dropdown.Item>
                      <Dropdown.Item onClick={filter_products("oily")}>Oily</Dropdown.Item>
                      <Dropdown.Item onClick={filter_products("combined")}>Combined</Dropdown.Item>
                      <Dropdown.Item onClick={filter_products("sensitive")}>Sensitive</Dropdown.Item>
                   </Dropdown.Menu>
                </Dropdown>
             <Dropdown style={{margin:"8px 4px 8px 4px"}}>
                   <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Brand
                   </Dropdown.Toggle>
                   <Dropdown.Menu>
                      <Dropdown.Item onClick={filter_products("cosrx")}>CosRX</Dropdown.Item>
                      <Dropdown.Item onClick={filter_products("dr. jart+")}>Dr. Jart+</Dropdown.Item>
                      <Dropdown.Item onClick={filter_products("mizon")}>Mizon</Dropdown.Item>
                      <Dropdown.Item onClick={filter_products("nature republic")}>Nature Republic</Dropdown.Item>
                   </Dropdown.Menu>
                </Dropdown>
         </div>
    )
 }

export default FilterBar;