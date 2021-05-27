import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { HeaderStyle } from '../styles';

export const Header = () => {
 return (
        <HeaderStyle >
            <Navbar bg="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Brand href="/"> <img style={{width:"100%", height:"100%"}} src="images/Pibu-v1_2.png" alt=""></img></Navbar.Brand>

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

                <Nav className="ml-auto flex-container" >
                    <Nav.Link href="\basket"><img src="images/shopping-basket-2-xxl.png" alt="" style={{width: "20%", height:"20%"}}/></Nav.Link>
                    <Nav.Link className="center" href="/login">Login</Nav.Link>
                    <Nav.Link className="center"  href="/register">Register</Nav.Link>
                </Nav>
            </Navbar>
        </HeaderStyle>
 );
};
