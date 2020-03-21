import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './Diagram.css';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export class Diagram extends Component {
  render () {
    const { name, confidense, reason } = this.props;
    const value = (confidense || 0.33) * 100;
    let styles = {};
    if (name) {
      styles = {
        pathColor: 'green',
        textColor: 'green',
      }
    } else {
      styles = {
        pathColor: 'red',
        textColor: 'red',
      }
    }
    return (
      <CircularProgressbar styles={buildStyles(styles)} className="progressbar" value={value} maxValue={100} text={`${value}%`} />
    );
  }
}
