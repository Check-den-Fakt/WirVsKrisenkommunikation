import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import { Diagram } from '../../components/Diagram';

export default function Check() {
  if(false) {
    return (
      <div>
          <h1>Dein Ergebnis ist</h1>
          <div className="container">
              <div className="raw">
                 <div className="text-center">
                  <Diagram />
                 </div>
              </div>
          </div>
        </div>
    );
  }
  // Declare a new state variable, which we'll call "count"
  return (
    <div>
      <h1 className="display-4">Check deine Corona-News</h1>
      <p className="lead">Bevor du Nachrichten glaubst oder weiterleitest, überprüfe erst ob sie wahr sind!</p>
      <AddNews />
    </div>
  );
}