import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Footer = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="bg-opacity-75" fixed="bottom">
        <Container className="justify-content-end">
          <small>
            &copy; Copyright 2022, jac.polanski. All Rights Reserved
          </small>
        </Container>
      </Navbar>
    </>
  );
};

export default Footer;
