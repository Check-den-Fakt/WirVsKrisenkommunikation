import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
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
    this.props.onSubmit({
      [key]: text,
    })
  }

  render () {
    const { text } = this.state; 
    return (
    <Form>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label></Form.Label>
        <Form.Control
          onChange={(e, ee) => this.onChangeValue('text', e, ee)} 
          as="textarea" 
          rows="10"
          placeholder="Füge hier eine URL oder Textnachricht ein"
        />
      </Form.Group>
      <Button 
        disabled={!text} 
        onClick={this.handleSubmit} 
        variant="primary"
      >
        Nachricht checken
      </Button>
    </Form>
    );
  }
}
