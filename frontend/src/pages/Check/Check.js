import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';

export default function Check() {
  // Declare a new state variable, which we'll call "count"
  return (
    <div>
      <h1 className="display-4">Check deine Corona-News</h1>
        <p className="lead">Bevor du Nachrichten glaubst oder weiterleitest, überprüfe erst ob sie wahr sind!</p>
      <AddNews />
    </div>
  );
}