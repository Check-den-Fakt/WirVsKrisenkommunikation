import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

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

  handleSubmit = () => {
    console.log(this.state);
  }

  render () {
    return (

        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="progress blue">
                <span className="progress-left">
                    <span className="progress-bar"></span>
                </span>
              </div>
            </div>
          </div>
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
      <Button onClick={this.handleSubmit} variant="primary">
        Nachricht überprüfen
      </Button>
    </Form>
        </div>
    );
  }
}
