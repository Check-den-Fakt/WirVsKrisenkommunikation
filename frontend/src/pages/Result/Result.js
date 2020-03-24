import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import { Diagram } from '../../components/Diagram';
import { Button, NavLink } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'
import './Result.css';
import { ProgressBar, Card } from 'react-bootstrap';
import ShareButtons from '../../components/ShareButtons';
import ResultDetails from './ResultDetails';

export default function Result({ result, requestData }) {
  // Declare a new state variable, which we'll call "count"
  let content = null;
  const trustedPublisher = result ? result.trustedPublisher : null; //result;
  let bgClass = '';

  let foundationDate = new Date("March 20, 2020 24:00:00").getTime();
  let nowDate = new Date().getTime(); 
  var deltaT = nowDate - foundationDate;
  var deltaDays = Math.floor(deltaT / (1000 * 60 * 60 * 24));

  if (trustedPublisher) {
    
    const { trustScore } = trustedPublisher;
    if (trustScore > 0.70) {
      bgClass = 'bg-color-success';
      content = <Card className="cart-top-margin">
        <Card.Body className="shadow">
          <div class="container">
            <div class="row">
              <div class="col-sm-11">
                <Card.Title><b>{trustScore * 100}% glaubwürdig</b></Card.Title>
                <ProgressBar variant="success" now={trustScore * 100} class="inline" />
              </div>
              <div class="col-sm-1">
                <span className="material-icons success">
                    check_circle
                </span>
              </div>
            </div>
          </div>
          <Card.Text className="cart-top-margin">
          <b>check-den-fakt.de</b> Prüfung konnte seriöse Quellen bestätigen. Du kannst die Nachricht teilen.
          </Card.Text>
        </Card.Body>
      </Card>
    } else {
      bgClass = 'bg-color-error';
      content = <Card>
      <Card.Body>
        <div class="container">
          <div class="row">
            <div class="col-sm-11">
              <Card.Title>{trustScore * 100}% glaubwürdig</Card.Title>
              <ProgressBar variant="danger" now={trustScore * 100} />
            </div>
            <div class="col-sm-1">
              <span className="material-icons danger">
                  cancel
              </span>
            </div>
          </div>
        </div>
        <Card.Text className="cart-top-margin">
          <b>check-den-fakt.de</b> Prüfung konnte kaum seriöse Quellen bestätigen. Bitte leite diese Nachricht nicht weiter.Nachricht bestätigen. Bitte leite sie nicht weiter.
        </Card.Text>
      </Card.Body>
    </Card>
    }
  } else {
    bgClass = 'bg-color-warning';
    content = <Card>
    <Card.Body>
      <div>
        <div class="row">
          <div class="col-sm-11">
            <Card.Title>noch nicht verifizierbar</Card.Title>
            <ProgressBar variant="danger" now={0} />
          </div>
          <div class="col-sm-1">
            <span className="material-icons undef">
                live_help
            </span>
          </div>
        </div>
      </div>
      <Card.Text className="cart-top-margin">
        <p>Unsere Künstliche Intelligenz arbeitet auf hochtouren sich alles anzueignen, gib ihr noch etwas Zeit.</p>
      <b>check-den-fakt.de</b> Prüfung konnte keine Quellen finden. Bitte leite diese Nachricht nicht weiter.
      </Card.Text>
    </Card.Body>
  </Card>
  }

  return (
    <div className="text-center">

    <Accordion className="">
      <Card>
        <Card.Header>
          <Accordion.Toggle as={NavLink}  eventKey="0">
          <b>Alpha-Version</b>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
          <p>Wusstest du, dass <b>check-den-fakt.de</b> gerade einmal {deltaDays} Tage alt ist?</p> Wir stehen gerade erst so richtig in den Startlöchern und haben großes vor. Wir wollen unsere Plattform themenübergreifend weiterentwickeln und versuchen so viel wie möglich von unseren Nutzern zu lernen.
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      </Accordion>
      
      
      <div className="d-flex justify-content-center">
          <div className={`polygon ${bgClass}`}>
            <div className="container">
            {content}
            {trustedPublisher && <ShareButtons />}
            </div>
          </div>
        </div>
      <div className="text-left">
        <p className="fact-header">Deine Nachricht:</p>
        <Card className="your-message-card">
          <p>"{requestData && (requestData.text || requestData.url)}"</p>
        </Card>
      </div>
      {result.fakeCount && <ResultDetails fakeNewsCount={result.fakeCount} maxValue={result.maxValue} />}
      <a className="fact-link pt-5" href="/about">Wer wir sind?</a>
    </div>
  );
}
