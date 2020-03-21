import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import { Diagram } from '../../components/Diagram';
import './Result.css';

export default function Result({ result }) {
  // Declare a new state variable, which we'll call "count"
  return (
    <div>
      <h1 className="display-4">Check deine Corona-News</h1>
      <p className="lead">Bevor du Nachrichten glaubst oder weiterleitest, überprüfe erst ob sie wahr sind!</p>
      {JSON.stringify(result, null, 2)}
      {/* <div className="text-center">
          <Diagram className="text-center" />
      </div> */}
    </div>
  );
}
