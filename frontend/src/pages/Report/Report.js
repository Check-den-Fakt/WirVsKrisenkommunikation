import React, { Component } from 'react';
import './Report.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default class Report extends Component {
  render () {
    const { text } = this.state; 
    // Declare a new state variable, which we'll call "count"
    return (
    <div>
      <h1 className="display-4">Fake-News reporten</h1>
      <p className="lead">Du hast ein eindeutigen Fake endeckt? Reiche diesen ein!</p>
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
        <p className="lead">Warum glaubst du, dass das Fake ist? Hast du dafür Belege?</p>
        <Button 
          disabled={!text} 
          onClick={this.handleSubmit} 
          variant="primary"
        >
          Report
        </Button>
      </Form>
    </div>
    );
  }
}