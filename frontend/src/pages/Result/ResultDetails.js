import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import { Diagram } from '../../components/Diagram';
import './Result.css';
import { ProgressBar, Card } from 'react-bootstrap';
import ShareButtons from '../../components/ShareButtons';
import { Accordion, useAccordionToggle } from 'react-bootstrap';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log('')
  );

  return (
    <a
      onClick={decoratedOnClick}
    >
      {children}
    </a>
  );
}

export default function ResultDetails({ fakeNewsCount, maxValue, result, requestData, trustScore, userScore }) {

  return (
    <div className="text-left margin-top-40">
      <p className="fact-header">FakeNews Datenbank search:</p>
      {/* <h1>Wie kommt diese Einschätzung zustande:</h1>   */}
      {/* <div>
        <Diagram text={16} isFull confidense={100} />
        <Accordion defaultActiveKey="0">
          <CustomToggle eventKey="0">Details anzeigen</CustomToggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Accordion>
        <p>{trustScore || 16} seriöse Quellen haben diese Nachricht als glaubwürdig bestätigt.</p>
      </div> */}
      <div>
        <Diagram text={fakeNewsCount} isFull confidense={maxValue} />
        <p className="margin-top-40">Wir haben in unser FakeNews Datenbank {fakeNewsCount} results mit einer Übereinstimmung von bis zu {maxValue}%</p>
      </div>
    </div>
  );
}
