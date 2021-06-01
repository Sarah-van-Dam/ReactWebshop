import React, { useContext } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { ShopContext } from '../ShoppingContext';

import { HeaderStyle } from '../styles';

export const Header = () => {
  const  shopContext = useContext(ShopContext)
  // check conext
  if (!shopContext)
     throw(new Error("ShopContext is undefined!"))
     
  // deconstruct context to get quiz
  const { isLoggedIn, updateLoggedIn, updateCurrentUser } = shopContext;

  const history = useHistory();

  const logout = () => {
    updateLoggedIn(false);
    updateCurrentUser({customerName: "", email: "", password:"", basket:[]});
    history.push("/home")
  }

 return (
        <HeaderStyle >
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Brand> <img onClick={() => history.push("/")} style={{width:"100%", height:"100%"}} src="images/Pibu-v1_2.png" alt=""></img></Navbar.Brand>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => history.push("/products")}>Products</Nav.Link>
                        <NavDropdown title="Product Type" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => history.push("/products")}>Cleanser</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => history.push("/products")}>Toner</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => history.push("/products")}>Serum</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => history.push("/products")}>Mask</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => history.push("/products")}>Cream</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Skin Type" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => history.push("/products")}>Dry</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => history.push("/products")}>Oily</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => history.push("/products")}>Combined</NavDropdown.Item>
                            <NavDropdown.Item href="vproducts">Sensitive</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Brands" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => history.push("/products")}>CosRX</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => history.push("/products")}>Dr.Jart+</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => history.push("/products")}>Mizon</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => history.push("/products")}>Nature Republic</NavDropdown.Item>
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