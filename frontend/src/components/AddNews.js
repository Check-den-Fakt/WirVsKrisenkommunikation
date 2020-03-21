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
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
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
      {/* <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Url</Form.Label>
        <Form.Control 
          onChange={(e, ee) => this.onChangeValue('url', e, ee)} 
          type="url" 
          placeholder="name@example.com" 
        />
      </Form.Group> */}
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
        Nachricht überprüfen
      </Button>
    </Form>
    );
  }
}
