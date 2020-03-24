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
        <div className="d-flex justify-content-around mb-5">
          <img src="/img/logo.svg" width="200em" height="200em" />
        </div>

        <h1 className="text-center">Finde und widerlege Corona-Falschnachrichten</h1>
        <p className="text-center">Die Anzahl an Falschmeldungen zum Coronavirus steigt immer weiter an. Viele Menschen in Deutschland haben Schwierigkeiten, den Wahrheitsgehalt dieser Nachrichten zu bewerten. Dies kann zu Unsicherheiten und Fehlverhalten führen – manchmal mit dramatischen Folgen. </p>
      

        <div className="center mt-5">
          <div className="row">
            <div className="col-sm m-2">
            <Button href="/check" variant="primary" block className="py-3">
              <b>Nachricht überprüfen</b>
            </Button>
            </div>
            <div className="col-sm m-2">
            <Button href="/report" variant="secondary" block className="py-3">
              <b>Falschnachricht melden</b>
            </Button>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="polygon background-color-1">
            <div className="container polygon-content">
            <h2>Worum geht’s hier?</h2>
            <p>
            Check the Fact ist ein Portal, auf dem du Nachrichten auf ihren Wahrheitsgehalt prüfen lassen kannst. Dazu gleicht Check the Fact sie mit qualifizierten Expertenmeinungen und Quellen ab. Ist die Nachricht glaubwürdig, teile sie. Wenn nicht, poste eine Klarstellung. 
            </p><p>
            Ganz nach dem Motto: Erst klären, dann sharen!
            </p>
            </div>
            </div>
        </div>
        
        <h1>So prüfst Du Deine Nachricht?</h1>
        <div className="row mt-5 pt-3">
          <div className="col-3">
            <span className="material-icons circle-icon">
              backup
          </span>
          </div>
          <div className="col-9">
            <h3>1. Nachricht hochladen</h3>
            Gib deine Nachricht bei Check the Fact ein. Folgende Möglichkeiten hast du:
              <li>Links</li>
              <li>Freitexteingabe</li>
              <li>Social Messenger Nachrichten</li>
              <li>Tweets</li>
          </div>
        </div>
        
        <div className="row mt-5">
          <div className="col-3">
            <span className="material-icons circle-icon">
              thumb_up_alt
          </span>
          </div>
          <div className="col-9">
            <h3>2. Ergebnis erhalten</h3>
            Nach dem Hochladen erhältst du die Auswertung, mit folgenden Möglichkeit:
              <li>Grün: Glaubwürdig. Teilen erwünscht!</li>
              <li>Gelb: Zweifelhaft! Hinweise beachten!</li>
              <li>Rot: Unglaubwürdig. Nicht weitergeben! Klarstellen!</li>
              <li>Grau: Nicht auswertbar. Hinweise beachten!</li>
          
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-3">
            <span className="material-icons circle-icon">
              share
          </span>
          </div>
          <div className="col-9">
            <h3>3. Auswertung weiterleiten </h3>
            <p>Teile das Prüfergebnis mit deinen Kontakten, um sie zu informieren.
          </p>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="polygon background-color-2">
            <div className="container polygon-content">

                <h2>Trending News</h2>
                <ul>
              {news.map(({ name, url }, index) => <li><a href={url}>{name}</a></li>)}
            </ul>

            </div>
          </div>
        </div>


        <div className="text-center pt-5">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <div className="img-container">
                <img
                  className="carousel-img"
                  src="/img/carousel/logo_klein.png"
                  alt="Check the Fact"
                />
                </div>
              </Carousel.Item>
              <Carousel.Item>
              <div className="img-container">
                <img
                  className="carousel-img"
                  src="/img/carousel/hashtag.png"
                  alt="Wir bleiben für euch Zuhause #wirvsvirushack"
                />
                </div>
              </Carousel.Item>
              <Carousel.Item>
              <div className="img-container">
                <img
                  className="carousel-img"
                  src="/img/carousel/Logo_Projekt.png"
                  alt="Wir vs Virus Hackathon"
                />
                </div>
              </Carousel.Item>
              <Carousel.Item>
              <div className="img-container">
                <img
                  className="carousel-img"
                  src="/img/carousel/Bund_Logo.png"
                  alt="Bundesregierung"
                />
                </div>
              </Carousel.Item>
              <Carousel.Item>
              <div className="img-container">
                <img
                  className="carousel-img"
                  src="/img/carousel/CFG_logo.png"
                  alt="Code for Germany"
                />
              </div>
              </Carousel.Item>
              <Carousel.Item>
              <div className="img-container">
                <img
                  className="carousel-img"
                  src="/img/carousel/D21_Logo.png"
                  alt="Initiative D21"
                />
                </div>
              </Carousel.Item>
              <Carousel.Item>
              <div className="img-container">
                <img
                  className="carousel-img"
                  src="/img/carousel/hub-Berlin.png"
                  alt="Impact Hub Berlin"
                />
                </div>
              </Carousel.Item>
              <Carousel.Item>
              <div className="img-container">
                <img
                  className="carousel-img"
                  src="/img/carousel/pt-logo.png"
                  alt="project together"
                />
                </div>
              </Carousel.Item>
              <Carousel.Item>
              <div className="img-container">
                <img
                  className="carousel-img"
                  src="/img/carousel/PF.png"
                  alt="Prototype Fund"
                />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel-img"
                  src="/img/carousel/sendLOGO.png"
                  alt="Send"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel-img"
                  src="/img/carousel/t4g.png"
                  alt="Tech4Germany"
                />
              </Carousel.Item>
            </Carousel>
          </div>

    </div>
  );
}