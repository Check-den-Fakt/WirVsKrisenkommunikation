import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

export default function Landing() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

  // Declare a new state variable, which we'll call "count"
  return (
    <div className="container">
     <>
        <div className="d-flex justify-content-around m-3">
          <img src="/img/logo.svg" width="40%" height="40%"/>
        </div>

        <h1 className="text-center">Finde und widerlege Corona-Falschnachrichten</h1>
        <p className="text-center">Die Anzahl an Falschmeldungen zum Coronavirus steigt immer weiter an. Viele Menschen in Deutschland* haben Schwierigkeiten, den Wahrheitsgehalt dieser Nachrichten zu bewerten*. Dies kann zu Unsicherheiten und Fehlverhalten führen – manchmal mit dramatischen Folgen. </p>
      

      <div className="w-75 center">
      <div className="row">
        <Button href="/check" variant="primary" size="lg" block className="m-3">
          Nachricht überprüfen
        </Button>
        

        <Button href="/report" variant="secondary" size="lg" block className="m-3">
          Falschnachricht melden
        </Button>
        </div>
      </div>

        <div className="pt-5 d-flex justify-content-center">
          <div className="polygon background-color-1">
            <div className="container">
            <h2>Worum geht es hier?</h2>
            <p>Check the Fact ist ein Portal, auf dem du Nachrichten auf ihren Wahrheitsgehalt prüfen lassen kannst. Dazu gleicht Check the Fact sie mit qualifizierten Expertenmeinungen und Quellen ab. Ist die Nachricht glaubwürdig, teile sie. Wenn nicht, poste eine Klarstellung. 
 Ganz nach dem Motto: Erst klären, dann sharen!</p>
            </div>
          </div>
        </div>

        <h1>So prüfst Du Deine Nachricht?</h1>

        <div className="row">
          <div className="col-3">
          <span className="material-icons">
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
          <span className="material-icons">
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
          <span className="material-icons">
          share
          </span>
          </div>
        <div className="col-9">
        <h3>3. Auswertung weiterleiten </h3>
        <p>Teile das Prüfergebnis mit deinen Kontakten, um sie zu informieren. 
          </p>
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
        <div className="raw">
            <div className="col-md-11">
                 <Carousel activeIndex={index} onSelect={handleSelect}>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             src="/img/logo.svg"
                             alt="Check the Fact"
                         />
                     </Carousel.Item>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             src="/img/hashtag.svg"
                             alt="Wir bleiben für euch Zuhause #wirvsvirushack"
                         />
                     </Carousel.Item>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             src="/img/Logo_Projekt_01.svg"
                             alt="Wir vs Virus Hackathon"
                         />
                     </Carousel.Item>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             src="/img/logo.svg"
                             alt="Check the Fact"
                         />
                     </Carousel.Item>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             src="/img/Bundesregierung_Logo.svg"
                             alt="Bundesregierung"
                         />
                     </Carousel.Item>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             src="/img/CFG_logo.png"
                             alt="Code for Germany"
                         />
                     </Carousel.Item>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             src="/img/D21_Logo.jpg"
                             alt="Initiative D21"
                         />
                     </Carousel.Item>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             src="/img/hub-Berlin.jpg"
                             alt="Impact Hub Berlin"
                         />
                     </Carousel.Item>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             src="/img/pt-logo.png"
                             alt="project together"
                         />
                     </Carousel.Item>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             src="/img/PrototypeFund_Logo.png"
                             alt="Prototype Fund"
                         />
                     </Carousel.Item>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             src="/img/sendLOGO.png"
                             alt="SEND"
                         />
                     </Carousel.Item>
                     <Carousel.Item>
                         <img
                             className="d-block w-100"
                             src="/img/Tech4Germany-Logopng.png"
                             alt="Tech4Germany"
                         />
                     </Carousel.Item>
                 </Carousel>
            </div>
        </div>


      </>
    </div>
  );
}