import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

export class NavMenu extends Component {
  render () {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
<<<<<<< HEAD
        <Navbar.Brand href="/">Check den Fakt!</Navbar.Brand>
=======
        <Navbar.Brand href="/"><img
        alt=""
        src="/logo.svg"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />check-den-fakt.de</Navbar.Brand>
>>>>>>> cb1fc01fb842b6859ceec0bb2c52c07e1118b22d
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/trending">Trends</Nav.Link>
            <Nav.Link href="/sources">Unseriöse Seiten/Quellen</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/impressum">Impressum</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
