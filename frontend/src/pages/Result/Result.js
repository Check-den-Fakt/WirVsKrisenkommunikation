import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import { Diagram } from '../../components/Diagram';
import './Result.css';
import { ProgressBar } from 'react-bootstrap';

export default function Result({ result }) {
  // Declare a new state variable, which we'll call "count"
  const isPositive = false;
  let content = null;
  if (isPositive) {
    content = <>
      <h1 className="display-4">Diese Nachricht ist mit großer wahrscheinlichkeit OK</h1>
      <p className="lead pink">Diese Nachricht is verifiziert... blablabal durch was, wen, wie?</p>      
    </>;
  } else {
    content = <>
      <h1 className="display-4">Diese Nachricht scheint ein Fake zu sein</h1>
      <p className="lead pink">Diese Nachricht entspricht nicht der Wahrheit... blablabla</p>
    </>
  }

  return (
    <div>
      <h1></h1>
      <div className="container">
        <div className="raw">
            <div className="text-center">
                <Diagram />
            </div>
        </div>
      </div>
      <h1></h1>
      {content}
        {/*<ProgressBar now={60} />
      {JSON.stringify(result, null, 2)}
      <div className="text-center">
          <Diagram className="text-center" />
      </div> */}
      <a href="/about">Wer wir sind</a>
    </div>
  );
}
