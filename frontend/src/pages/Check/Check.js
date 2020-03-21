import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import { Diagram } from '../../components/Diagram';

export default function Check() {
  // Declare a new state variable, which we'll call "count"
  return (
    <div>
      <Diagram />
      <p>About Page</p>
      <AddNews />
    </div>
  );
}