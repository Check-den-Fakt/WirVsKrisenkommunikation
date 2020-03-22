import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import "./Landing.css";
import fetchAPI from '../../utils/fetchAPI';
import Carousel from 'react-bootstrap/Carousel';

export default function Landing() {
  const [index, setIndex] = useState(0);
  const [news, setNews] = useState([]);

  useEffect(async () => {
    // Update the document title using the browser API
    const response = await fetchAPI.postData('https://we-komnews-fa.azurewebsites.net/api/GetNews', {
      query : "corona"
    })
    setNews(response.news.value.map(({ name, url }) => ({ name, url }) ));
  }, []);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // Declare a new state variable, which we'll call "count"
  return (
    <div className="container">
        <div className="d-flex justify-content-around m-3">
          <img src="/img/logo.svg" width="40%" height="40%" />
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
            <h2 className="display-4">Worum geht’s hier?</h2>
            <p>
            Check the Fact ist ein Portal, auf dem du Nachrichten auf ihren Wahrheitsgehalt prüfen lassen kannst. Dazu gleicht Check the Fact sie mit qualifizierten Expertenmeinungen und Quellen ab. Ist die Nachricht glaubwürdig, teile sie. Wenn nicht, poste eine Klarstellung. 
            </p><p>
            Ganz nach dem Motto: Erst klären, dann sharen!
            </p>
            </div>
            </div>
        </div>
        
        <h1>So prüfst Du Deine Nachricht?</h1>
        <div className="row mt-5">
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
        
        <div className="row mt-5">
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

        <div className="row mt-5">
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
            <ul>
              {news.map(({ name, url }, index) => <li><a href={url}>{name}</a></li>)}
            </ul>
          </div>
        </div>

        <div className="picCarousel">
          <div className="text-center">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/carousel/logo_klein.png"
                  alt="Check the Fact"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/carousel/hashtag.png"
                  alt="Wir bleiben für euch Zuhause #wirvsvirushack"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/carousel/Logo_Projekt.png"
                  alt="Wir vs Virus Hackathon"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/carousel/Bund_Logo.png"
                  alt="Bundesregierung"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/carousel/CFG_logo.png"
                  alt="Code for Germany"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/carousel/D21_Logo.png"
                  alt="Initiative D21"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/carousel/hub-Berlin.png"
                  alt="Impact Hub Berlin"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/carousel/pt-logo.png"
                  alt="project together"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/carousel/PF.png"
                  alt="Prototype Fund"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/carousel/sendLOGO.png"
                  alt="Send"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/img/carousel/t4g.png"
                  alt="Tech4Germany"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          </div>
    </div>
  );
}