import React, { useState } from 'react';
import './Landing.css';
import { Button } from 'react-bootstrap';

export default function Landing() {
  // Declare a new state variable, which we'll call "count"
  return (
    <div>
      Landing Page
      <>
        <Button href="/check" variant="primary" size="lg" block>
          Nachricht überprüfen
        </Button>
        <Button href="/report" variant="secondary" size="lg" block>
          Fake Nachricht melden
        </Button>
      </>
    </div>
  );
}