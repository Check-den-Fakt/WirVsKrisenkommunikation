import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export class NavMenu extends Component {
  render () {
    return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/check">Check</Nav.Link>
      </Nav>
      {/* <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-light">Search</Button>
      </Form> */}
    </Navbar>
    );
  }
}
