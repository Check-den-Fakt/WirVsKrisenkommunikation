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
  const { trustedPublisher } = result; //result;
  if (trustedPublisher) {
    const { trustScore } = trustedPublisher;
    if (trustScore > 0.70) {
      console.log('POSITIV')
      content = <Card>
        <Card.Body>
          <Card.Title>{trustScore * 100}% glaubwürdig</Card.Title>
          <ProgressBar variant="success" now={trustScore * 100} />
          <Card.Text>
            Die Check-the-Fact-Prüfung bestätigt, dass die Nachricht seriös ist. Du kannst die Nachricht gerne weiter verbreiten!
          </Card.Text>
        </Card.Body>
      </Card>
    } else {
      content = <Card>
      <Card.Body>
        <Card.Title>{trustScore * 100}% glaubwürdig</Card.Title>
        <ProgressBar variant="danger" now={trustScore * 100} />
        <Card.Text>
        Die Check-the-Fact-Prüfung konnte kaum seriöse Quellen finden, die diese Nachricht bestätigen. Bitte leite sie nicht weiter.
        </Card.Text>
      </Card.Body>
    </Card>
    }
  } else {
    content = <Card>
    <Card.Body>
      <Card.Title>nicht verifizierbar</Card.Title>
      <ProgressBar variant="danger" now={0} />
      <Card.Text>
        Die Check-the-Fact-Prüfung konnte keine Quellen finden. Vielleicht hast du mehr Erfolg in der Eigenrecherche.
      </Card.Text>
    </Card.Body>
  </Card>
  }


  return (
    <div>
      <h1></h1>
      {content}
      <ShareButtons />
      <h1>Deine Nachricht:</h1>
      <p>"{requestData && (requestData.text || requestData.url)}"</p>
      {/* <ResultDetails /> */}
      <a href="/about">Wer wir sind</a>
    </div>
  );
}
