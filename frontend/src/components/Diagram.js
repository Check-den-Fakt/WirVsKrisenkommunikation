import React, { Component } from 'react';
import './Diagram.css';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export class Diagram extends Component {
  render () {
    const { name, confidense, isFull, text } = this.props;
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
