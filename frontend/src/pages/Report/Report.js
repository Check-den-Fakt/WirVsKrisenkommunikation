import React, { Component } from 'react';
import './Report.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
//import Reaptcha from 'reaptcha';

window.id = 0;

export default class Report extends Component {
  state = {
    text: ''
  }

  render () {
    const { text } = this.state; 
    // Declare a new state variable, which we'll call "count"
    return (
    <div>
      <h1 className="display-4">Falschnachricht melden</h1>
      <p className="lead">Du hast eine Falschnachricht entdeckt? Teile sie hier mit uns!</p>
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
        <p className="lead">Warum ist die Nachricht falsch? Unterstütze uns mit deinen Gegenbeweisen.</p>
        *<Form.Control
            onChange={(e, ee) => this.onChangeValue('text', e, ee)}
            as="textarea"
            rows="10"
            placeholder="Beweis 1"
        />
        <Button 
          disabled={!text} 
          onClick={this.handleSubmit} 
          variant="primary"
        >
          Nachricht einreichen
        </Button>
      </Form>
    </div>
    );
  }
}