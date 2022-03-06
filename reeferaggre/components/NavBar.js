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
                    <LogoMain/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse className="justify-content-end fs-5" id="basic-navbar-nav">
                        <Nav>
                            <Link href="/"><a className="nav-link">Home</a></Link>
                            <Link href="/containersO_B"><a className="nav-link">Units O/B</a></Link>
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <Link href="/settings/settingsThreshold"><a className="fs-5 dropdown-item">Threshold
                                    Settings </a></Link>
                                <Link href="/settings/settingsGeneral"><a className="fs-5 dropdown-item">General
                                    settings</a></Link>
                            </NavDropdown>
                            <Link href="/about"><a className="nav-link">About</a></Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;