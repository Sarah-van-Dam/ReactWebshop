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
{/* <nav className="sticky-top">

<div className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="index.html">
      <img src="images\Pibu-v1_2.png"/>
    </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="login.html">Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="register.html">Register</a>
        </li>
      </ul>
    </div>
</div>

<div className="navbar navbar-expand-lg navbar-light bg-light">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="/products.html">Products <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Product Type
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="products.html">Cleanser</a>
              <a className="dropdown-item" href="products.html">Toner</a>
              <a className="dropdown-item" href="products.html">Serum</a>
              <a className="dropdown-item" href="products.html">Mask</a>
              <a className="dropdown-item" href="products.html">Face Cream</a>
            </div>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Skin Type
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="products.html">Dry Skin</a>
            <a className="dropdown-item" href="product.html">Oily Skin</a>
            <a className="dropdown-item" href="products.html">Combined Skin</a>
            <a className="dropdown-item" href="products.html">Sensitive Skin</a>
          </div>
        </li>
        <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Brands
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="products.html">CosRX</a>
                <a className="dropdown-item" href="products.html">Dr.Jart+</a>
                <a className="dropdown-item" href="products.html">Mizon</a>
                <a className="dropdown-item" href="products.html">Nature Republic</a>
              </div>
            </li>
        </ul>
        <ul className="navbar-nav ml-auto"></ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button className="btn default my-2 my-sm-0" type="submit">Search</button>
          </form>
          <div> 
            <li className="nav-item">
              <a className="nav-link" href="/basket.html">
              <img src="images/shopping-basket-2-32.png">
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav> */}
