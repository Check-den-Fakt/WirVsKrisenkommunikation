import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './Diagram.css';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';

export class Diagram extends Component {
  render () {
    const value = 50;

    return (
      <CircularProgressbar className="progressbar" value={value} maxValue={1} text={`${value}%`} />
    );
  }
}
