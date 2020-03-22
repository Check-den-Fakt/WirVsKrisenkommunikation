import React, { Component } from 'react';
import './Report.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import fetchAPI from '../../utils/fetchAPI';
import apisdk from '../../constants/apisdk';
//import Reaptcha from 'reaptcha';

window.id = 0;

export default class Report extends Component {
  state = {
    text: '',
    sources: [],
    tempSource: '',
  }

  handleAddNew = () => {
    const { sources, tempSource } = this.state;
    this.setState({ sources: [...sources, tempSource], tempSource: '' })
  }

  handleSubmit = async () => {
    const response = fetchAPI.postData(apisdk.REPORT, { text: this.state.text })
    console.log(response);
  }

  render () {
    const { text, tempSource, sources } = this.state; 
    // Declare a new state variable, which we'll call "count"
    return (
    <div>
      <h1 className="display-4">Falschnachricht melden</h1>
      <p className="lead">Du hast eine Falschnachricht entdeckt? Teile sie hier mit uns!</p>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label></Form.Label>
          <Form.Control
            onChange={({ currentTarget }) => this.setState({ text: currentTarget.value })} 
            as="textarea" 
            rows="10"
            value={text}
            placeholder="Füge hier eine URL oder Textnachricht ein"
          />
        </Form.Group>
        {/* <div>
          <p className="lead">Deine Belege:</p>
          {sources.map(source => <p>{source}</p>)}
          <Form.Control
              onChange={({ currentTarget }) => this.setState({ tempSource: currentTarget.value })}
              value={tempSource}
              placeholder="Quellen einfügen"
          />
          <a onClick={this.handleAddNew}>Weiteren Beleg hinzufügen +</a>
        </div> */}
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