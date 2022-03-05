import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from "react-bootstrap/Container";
import {Nav, NavDropdown} from "react-bootstrap";
import LogoMain from "./LogoMain";
import Link from "next/link";

const NavBar = () => {

    return (
        <>
            <Navbar bg="light" expand="lg" className="bg-opacity-75">
                <Container>
                    <LogoMain />
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse className="justify-content-end fs-5" id="basic-navbar-nav">
                        <Nav>
                            <Link href="/"><a className="nav-link">Home</a></Link>
                            <Nav.Link>Units O/B</Nav.Link>
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item className="fs-5">Alarms threshold</NavDropdown.Item>
                                <NavDropdown.Item className="fs-5">General settings</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link>About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;