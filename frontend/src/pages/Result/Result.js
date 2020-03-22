import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import { Diagram } from '../../components/Diagram';
import './Result.css';
import { ProgressBar, Card } from 'react-bootstrap';
import ShareButtons from '../../components/ShareButtons';
import ResultDetails from './ResultDetails';

export default function Result({ result, requestData }) {
  // Declare a new state variable, which we'll call "count"
  let content = null;
  const trustedPublisher = result ? result.trustedPublisher : null; //result;
  let bgClass = '';
  if (trustedPublisher) {
    
    const { trustScore } = trustedPublisher;
    if (trustScore > 0.70) {
      bgClass = 'bg-color-success';
      content = <Card className="cart-top-margin">
        <Card.Body>
          <div class="container">
            <div class="row">
              <div class="col-sm-11">
                <Card.Title>{trustScore * 100}% glaubwürdig</Card.Title>
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
            Die Check-the-Fact-Prüfung bestätigt, dass die Nachricht seriös ist. Du kannst die Nachricht gerne weiter verbreiten!
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
          Die Check-the-Fact-Prüfung konnte kaum seriöse Quellen finden, die diese Nachricht bestätigen. Bitte leite sie nicht weiter.
        </Card.Text>
      </Card.Body>
    </Card>
    }
  } else {
    bgClass = 'bg-color-warning';
    content = <Card>
    <Card.Body>
      <div class="container">
        <div class="row">
          <div class="col-sm-11">
            <Card.Title>nicht verifizierbar</Card.Title>
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
        Die Check-the-Fact-Prüfung konnte keine Quellen finden. Vielleicht hast du mehr Erfolg in der Eigenrecherche.
      </Card.Text>
    </Card.Body>
  </Card>
  }

  return (
    <div className="text-center">
      <h1>Ergebnis:</h1>
      <div className="pt-5 d-flex justify-content-center">
          <div className={`polygon ${bgClass}`}>
            {content}
            {trustedPublisher && <ShareButtons />}
          </div>
        </div>
      <div className="text-left margin-top-40">
        <p className="fact-header">Deine Nachricht:</p>
        <Card className="your-message-card">
          <p>"{requestData && (requestData.text || requestData.url)}"</p>
        </Card>
      </div>
      {result.fakeCount && <ResultDetails fakeNewsCount={result.fakeCount} maxValue={result.maxValue} />}
      <a className="fact-link" href="/about">Wer wir sind?</a>
    </div>
  );
}
