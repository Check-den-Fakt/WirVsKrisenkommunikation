import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import { Diagram } from '../../components/Diagram';
import './Result.css';
import { ProgressBar, Card } from 'react-bootstrap';
import ShareButtons from '../../components/ShareButtons';
import { Accordion, useAccordionToggle } from 'react-bootstrap';

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <a
      onClick={decoratedOnClick}
    >
      {children}
    </a>
  );
}

export default function ResultDetails({ result, requestData, trustScore }) {

  return (
    <div>
      <h1>Wie kommt diese Einschätzung zustande:</h1>  
      <Diagram confidense={trustScore} />
      <Accordion defaultActiveKey="0">
        <CustomToggle eventKey="0">Details anzeigen</CustomToggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
}
