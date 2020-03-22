import React, { useState } from 'react';



export default function About() {
  // Declare a new state variable, which we'll call "count"
  return (
      <div className="container">
          <h1>Das Check-den-Fakt-Team stellt sich vor</h1>
          <p>Wir sind ein interdisziplinäres Team, bestehend aus 36 Spezialisten aus aller Welt</p>
          <div className="pt-5 d-flex justify-content-center">
              <div className="polygon background-color-1">
                  <div className="container">
                      <h2>Unsere Mission</h2>
                      <p>
                          Wir wollen Menschen ein Tool an die Hand geben, mit denen Sie Corona-Falschnachrichten identifizieren und widerlegen können.
                      </p>
                  </div>
              </div>
          </div>
          <h2>Unsere Vision</h2>
          <p>
              Es ist unser Ziel Nutzer für einen verantwortungsbewussten Medienumgang zu sensibilisieren und die Verbreitung von Falschmeldungen zu reduzieren. Denn in Krisenzeiten ist es umso wichtiger, dass die Wahrheit viral geht.
          </p>
    </div>
  );
}