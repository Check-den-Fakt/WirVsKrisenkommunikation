import React, { Component } from 'react';
import { Navbar, Spinner } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import fetchAPI from '../utils/fetchAPI';
import apisdk from '../constants/apisdk';

export class AddNews extends Component {
  state = {
    url: '',
    text: '',
    type: '',
    isLoading: false,
  }

  onChangeValue = (property, { currentTarget }) => {
    const value = currentTarget.value;
    this.setState({ [property]: value });
  }

  isURL = (str) => {
    var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  }

  handleSubmit = async () => {
    const { text } = this.state;
    const key = this.isURL(text) ? 'url' : 'text'; 
    this.setState({ isLoading: true })
    this.props.onSubmit({
      [key]: text,
    })
  }

  render () {
    const { text, isLoading } = this.state; 
    return (
    <Form>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label></Form.Label>
        <Form.Control
          onChange={(e, ee) => this.onChangeValue('text', e, ee)} 
          as="textarea" 
          rows="6"
          disabled={isLoading}
          placeholder="Füge hier eine URL oder Textnachricht ein"
          maxlength="5099"
        />
      </Form.Group>
      {isLoading ? <Spinner animation="border" /> : <Button 
        disabled={!text} 
        onClick={this.handleSubmit} 
        variant="primary"
        className="submit-btn mb-3"
      >
        <b>Check den Fakt</b>
      </Button>}
    </Form>
    );
  }
}
