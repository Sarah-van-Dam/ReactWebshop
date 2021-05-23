import React from 'react';
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../assets/images/Pibu-v1_2.png'; 
import basketLogo from '../assets/images/shopping-basket-2-xxl.png';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {Products} from './products';
import {Login} from './login';
import { Register } from './register';
import { Basket } from './basket';
import { Home } from './home';


const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: black;
    &:hover { color: grey; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;



export const Header = () => {
 return (
    <BrowserRouter>
        <Styles>
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Brand href="/"> <img src={logo} alt=""></img></Navbar.Brand>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/products">Products</Nav.Link>
                        <NavDropdown title="Product Type" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/products">Cleanser</NavDropdown.Item>
                            <NavDropdown.Item href="/products">Toner</NavDropdown.Item>
                            <NavDropdown.Item href="/products">Serum</NavDropdown.Item>
                            <NavDropdown.Item href="/products">Mask</NavDropdown.Item>
                            <NavDropdown.Item href="/products">Cream</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Skin Type" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/products">Dry</NavDropdown.Item>
                            <NavDropdown.Item href="/products">Oily</NavDropdown.Item>
                            <NavDropdown.Item href="/products">Combined</NavDropdown.Item>
                            <NavDropdown.Item href="vproducts">Sensitive</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Brands" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/products">CosRX</NavDropdown.Item>
                            <NavDropdown.Item href="/products">Dr.Jart+</NavDropdown.Item>
                            <NavDropdown.Item href="/products">Mizon</NavDropdown.Item>
                            <NavDropdown.Item href="/products">Nature Republic</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                
                {/* <Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success" >Search</Button>
                    </Form>
                </Nav> */}
                
                <Nav className="ml-auto">
                    <Button variant="light" href="\basket"><img src={basketLogo} alt="" width="30" height="30"/></Button>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav>
            </Navbar>
        </Styles>
        <Switch>
                <Route exact path="/products" component={Products} />
                <Route exact path="/login" component={() => <Login/>} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/basket" component={Basket} />
                <Route exact path="/home" component={Home} />
                <Route path="/" component={Home} />
        </Switch>
    </BrowserRouter>
 );
};
