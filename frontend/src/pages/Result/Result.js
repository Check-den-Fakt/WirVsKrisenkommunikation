import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import { Diagram } from '../../components/Diagram';
import './Result.css';
import { ProgressBar, Card } from 'react-bootstrap';
import ShareButtons from '../../components/ShareButtons';
import ResultDetails from './ResultDetails';

export default function Result({ result, requestData }) {
  // Declare a new state variable, which we'll call "count"
  const isPositive = false;
  let content = null;
  const mokeResult = { trustScore: 0.75 };
  const { trustScore } = mokeResult; //result;
  if (trustScore > 0.70) {
    console.log('POSITIV')
    // content = <>
    //   <h1 className="display-4">Diese Nachricht ist mit großer wahrscheinlichkeit OK</h1>
    //   <p className="lead pink">Diese Nachricht is verifiziert... blablabal durch was, wen, wie?</p>      
    // </>;
    content = <Card>
      <Card.Body>
        <Card.Title>{trustScore * 100}% glaubwürdig</Card.Title>
        <ProgressBar now={trustScore * 100} />
        <Card.Text>
          Die Check-the-Fact-Prüfung bestätigt, dass die Nachricht seriös ist. Du kannst die Nachricht gerne weiter verbreiten!.
        </Card.Text>
      </Card.Body>
    </Card>
  } else {
    content = <>
      <h1 className="display-4">Diese Nachricht scheint ein Fake zu sein</h1>
      <p className="lead pink">Diese Nachricht entspricht nicht der Wahrheit... blablabla</p>
    </>
  }

  return (
    <div>
      {/* <h1></h1>
      <div className="container">
        <div className="raw">
            <div className="text-center">
                <Diagram confidense={trustScore} />
            </div>
        </div>
      </div> */}
      <h1></h1>
      {content}
      <ShareButtons />
      <h1>Deine Nachricht:</h1>
      <p>"{requestData && (requestData.text || requestData.url)}"</p>
      <ResultDetails />
        {/*<ProgressBar now={60} />
      {JSON.stringify(result, null, 2)}
      <div className="text-center">
          <Diagram className="text-center" />
      </div> */}
      <a href="/about">Wer wir sind</a>
    </div>
  );
}
