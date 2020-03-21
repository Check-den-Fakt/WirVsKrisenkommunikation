import React, { useState } from 'react';
import './Landing.css';
import { Button } from 'react-bootstrap';

export default function Landing() {
  // Declare a new state variable, which we'll call "count"
  return (
    <div className="container">
     <>
         <img src="/img/logo.svg" width="30%" height="30%"/>
        <h1 className="display-4">Finde und widerlege Corona-Fake-News</h1>
        <Button href="/check" variant="primary" size="lg" block>
          Nachricht überprüfen
        </Button>
        <Button href="/report" variant="secondary" size="lg" block>
          Fake Nachricht melden
        </Button>
         <h2>Worum geht's hier?</h2>
         <p className="lead">
             Die Flut falscher Nachrichten zum <u><i>Coronavirus</i></u> verwirrt uns und macht Angst, denn falsche Informationen sind selbst ein Virus.
             <br/>
             <br/>
             Auf dieser Webseite kannst Du <u>Corona-Meldungen auf Ihren Wahrheitsgehalt prüfen*</u> und von Dir entdeckte Falschmeldungen mitteilen.
             <br/>
             <br/>
             Hilf uns Corona Fake-News zu finden und zu widerlegen.
             <br/>
             <br/>
             Bist Du dir bei einer Nachricht nicht sicher, reiche sie bei uns ein. Wir überprüfen ihren Wahrheitsgehalt. Dadurch helfen wir dir, vertrauenswürdige Nachrichten zu teilen und Falschmeldungen für andere erkennbar zu machen.
             <br/>
             <br/>
             Oder Du greifst uns unter die Arme: Wenn Du eine Falschmeldung gefunden hast, kannst Du sie hier bei uns teilen und uns Gegenbeweise liefern. Wir gleichen alles ab und nehmen die Meldung in unsere Übersicht von Falschnachrichten auf.
             <br/>
             <br/>
             Fake-News verlieren ihre Macht, weil Du sie nicht mehr teilst. Schau genau hin und bilde dir deine eigene Meinung.
         </p>


      </>
    </div>
  );
}