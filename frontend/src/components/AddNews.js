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

  handleSubmit = async () => {
    this.props.onSubmit({
      text: this.state.text,
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
