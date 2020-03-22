import React, { useState } from 'react';
import './Landing.css';
import { Button } from 'react-bootstrap';

export default function Landing() {
  // Declare a new state variable, which we'll call "count"
  return (
    <div className="container">
     <>
        <div className="d-flex justify-content-around m-3">
          <img src="/img/logo.svg" width="40%" height="40%"/>
        </div>

        <h1>Finde und widerlege Corona-Falschnachrichten</h1>
        <p>Die Anzahl an Falschmeldungen zum Coronavirus steigt immer weiter an. Viele Menschen in Deutschland* haben Schwierigkeiten, den Wahrheitsgehalt dieser Nachrichten zu bewerten*. Dies kann zu Unsicherheiten und Fehlverhalten führen – manchmal mit dramatischen Folgen. </p>
        <div>

          
        <Button href="/check" variant="primary" size="lg" block>
          Nachricht überprüfen
        </Button>
        <Button href="/report" variant="secondary" size="lg" block>
          Falschnachricht melden
        </Button>
        </div>

        <div className="pt-5 d-flex justify-content-center">
        <div className="polygon background-color-1">
        <h2 className="display-4">Wer sind wir?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
        </div>

        <h1>So prüfst Du Deine Nachricht?</h1>
        <div className="row">
        <div className="row">
          <div className="col-3">
          <span class="material-icons">
          backup
          </span>
          </div>
        <div className="col-9">
        <h3>1. Nachricht hochladen</h3>
        <p>Gib deine Nachricht bei Check the Fact ein. Folgende Möglichkeiten hast du:</p>
        <ul >
          <li>Links</li>
          <li>Freitexteingabe</li>
          <li>Social Messenger Nachrichten</li>
          <li>Tweets</li>
          <li>Dokumente</li>
          <li>Bilder</li>
          </ul> 
        </div>
        </div>
        <div className="row">
          <div className="col-3">
          <span class="material-icons">
          thumb_up_alt
          </span>
          </div>
        <div className="col-9">
        <h3>2. Ergebnis erhalten</h3>
        <p>Nach dem Hochladen erhältst du die Auswertung, mit folgenden Möglichkeit: 
          Grün: Glaubwürdig. Teilen erwünscht! 
          Gelb: Zweifelhaft! Hinweise beachten! 
          Rot: Unglaubwürdig. Nicht weitergeben! Klarstellen! 
          Grau: Nicht auswertbar. Hinweise beachten!
          </p>
        </div>
        </div>
        <div className="row">
          <div className="col-3">
          <span class="material-icons">
          share
          </span>
          </div>
        <div className="col-9">
        <h3>3. Auswertung weiterleiten </h3>
        <p>Teile das Prüfergebnis mit deinen Kontakten, um sie zu informieren. 
          </p>
        </div>
        </div>
        </div>

         <div className="pt-5 d-flex justify-content-center">
             <div className="polygon background-color-2">
                 <div className="raw">
                     <div className="col-9">
                        <h2 className="display-4">Trending News</h2>
                     </div>
                 </div>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
             </div>
         </div>

        


      </>
    </div>
  );
}