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
    const { name, confidense, reason, isFull, text } = this.props;
    let value = (confidense || 0.33);
    let styles = {};
    if (!isFull) {
      value *= 100;
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
    }
    return (
      <div className="container">
        <div className="raw">
          <div className="text-center">
            <CircularProgressbar 
              styles={buildStyles(styles)} 
              className="progressbar" 
              value={value} 
              maxValue={100} 
              text={text ? text : `${value}%`} 
            />
          </div>
        </div>
      </div>
    );
  }
}
