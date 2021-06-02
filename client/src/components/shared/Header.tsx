import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Category } from '../../api/Category';
import { ShopContext } from '../../context/ShoppingContext';
import { capitalizeEachWordInString } from '../../helpers/helperFunctions';
import { HeaderStyle } from '../../styles/styles';

export const Header = () => {
  const  shopContext = useContext(ShopContext)
  // check context exist
  if (!shopContext)
     throw(new Error("ShopContext is undefined!"))
     
  // deconstruct context to get shop
  const { isLoggedIn, updateLoggedIn, updateCurrentUser } = shopContext;

  const history = useHistory();

  const logout = () => {
    updateLoggedIn(false);
    updateCurrentUser({customerName: "", email: "", password:"", basket:[]});
    history.push("/home")
  }

  let productTypes = shopContext.categories.find(c => c.Id === "producttype");
  let skinTypes = shopContext.categories.find(c => c.Id === "skintype");
  let brands = shopContext.categories.find(c => c.Id === "brand");

  const clearFilter = () => {
    return [{Id:"skintype", types: []},{Id:"producttype", types: []},{Id:"brand", types: []}]
  }

  const setEmptyFilterAndNavigate = () => {
    let newFilter : Category[] = clearFilter();
    shopContext.setFilterCategories(newFilter);
    history.push("/products");
  }

  const setProductFilterAndNavigate = (productType: string) => {
      let newFilter : Category[] = clearFilter();
      // let updatedProductFilter = shopContext.filterCategories.map((item, idx) => item);
      newFilter.find(c => c.Id === "producttype" )?.types.push(productType);
      shopContext.setFilterCategories(newFilter);
      history.push("/products");
  }  

  const setSkinFilterAndNavigate = (skinType: string) => {
    let newFilter : Category[] = clearFilter();
    // let updatedProductFilter = shopContext.filterCategories.map((item, idx) => item);
    newFilter.find(c => c.Id === "skintype" )?.types.push(skinType);
    shopContext.setFilterCategories(newFilter);
    history.push("/products"); 
}  

const setBrandFilterAndNavigate = (brand: string) => {
    let newFilter : Category[] = clearFilter();
    // let updatedProductFilter = shopContext.filterCategories.map((item, idx) => item);
    newFilter.find(c => c.Id === "brand" )?.types.push(brand);
    shopContext.setFilterCategories(newFilter);
    history.push("/products");
}  

 return (
        <HeaderStyle >
            <Navbar bg="light" expand="lg">
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Brand> <img onClick={() => history.push("/")} style={{width:"100%", height:"100%"}} src="images/Pibu-v1_2.png" alt=""></img></Navbar.Brand>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => setEmptyFilterAndNavigate()}>Products</Nav.Link>
                        <NavDropdown title="Product Type" id="basic-nav-dropdown">
                            {
                                productTypes?.types.map((item, idx) => (
                                    <NavDropdown.Item key={idx} onClick={() => setProductFilterAndNavigate(item)}>{capitalizeEachWordInString(item)}</NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                        <NavDropdown title="Skin Type" id="basic-nav-dropdown">
                            {
                                skinTypes?.types.map((item, idx) => (
                                    <NavDropdown.Item key={idx} onClick={() => setSkinFilterAndNavigate(item)}>{capitalizeEachWordInString(item)}</NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                        <NavDropdown title="Brands" id="basic-nav-dropdown">
                            {   
                                brands?.types.map((item, idx) => (
                                    <NavDropdown.Item key={idx} onClick={() => setBrandFilterAndNavigate(item)}>{capitalizeEachWordInString(item)}</NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>

                <Nav className="ml-auto flex-container" >
                    <Nav.Link onClick={() => history.push("/basket")}><img src="images/shopping-basket-2-xxl.png" alt="" style={{width: "20%", height:"20%", margin:"5px 5px 5px 5px"}}/></Nav.Link>
                    {
                      isLoggedIn ? 
                        <Nav.Link className="center" onClick={() => logout()} style={{margin:"5px 5px 5px 5px"}}>Logout</Nav.Link>
                      :
                        <Nav.Link className="center" onClick={() => history.push("/login")} style={{margin:"5px 5px 5px 5px"}}>Login</Nav.Link>
                    }
                    
                    <Nav.Link className="center" onClick={() => history.push("/register")} style={{margin:"5px 5px 5px 5px"}}>Register</Nav.Link>
                </Nav>
            </Navbar>
        </HeaderStyle>
 );
};