import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { Footer } from './Footer';
import { Container } from 'react-bootstrap';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container className="mt-5">
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }
}
