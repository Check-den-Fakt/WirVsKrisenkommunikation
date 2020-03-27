import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import "./Landing.css";
import fetchAPI from '../../utils/fetchAPI';
import Carousel from 'react-bootstrap/Carousel';
import partnerLogos from './partner_img.json';

export default function Landing() {
  const isMobile = window.innerWidth <= 768;
  const [index, setIndex] = useState(0);
  const [news, setNews] = useState([]);
  let mobileImages = null;
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await fetchAPI.postData('https://we-komnews-fa.azurewebsites.net/api/GetNews', {
        query : "corona"
      });
      setNews(response.news.value);
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  if(isMobile){
    mobileImages =<div className="text-center pt-5">
      <Carousel activeIndex={index} onSelect={handleSelect}>
      {partnerLogos.map(({ src, alt }, id) => 
      <Carousel.Item>
         <div className="img-container">
          <img
            className="carousel-img"
            src={src}
            alt={alt}
          />
          </div>
      </Carousel.Item>
      )}
      </Carousel>
    </div>
  }
  else{
    mobileImages = <div className="text-center">
      <div className="w-100">
      {partnerLogos.map(({ src, alt }, id) => 
          <img className ="logo-wall"
            src={src}
            alt={alt}
          />
      )}
            </div>
      </div>
  }


  // Declare a new state variable, which we'll call "count"
  return (
    <div className="container">
        <div className="d-flex justify-content-around mb-5">
          <img src="/img/logo.svg" width="200em" height="200em" alt="Check the Fact - Erst klären, dann sharen." />
        </div>
        <h1 className="text-center">Finde und widerlege <nobr>Corona-Falschnachrichten</nobr></h1>
        <p className="text-center">
        Die Anzahl an Falschmeldungen zum Coronavirus steigt immer weiter an. 
        Dabei sind diese Nachrichten teilweise so professionell verfälscht, dass die Bewertung des Wahrheitsgehalts nicht sofort erkennbar ist.
        Das kann zu Unsicherheiten und Fehlverhalten führen – manchmal mit dramatischen Folgen.
        </p>
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
            <div className="container">
            <h2>Worum geht’s hier?</h2>
            <p>
              Check the Fact ist ein Portal, auf dem du Nachrichten auf ihren Wahrheitsgehalt prüfen lassen kannst. Dazu gleicht Check the Fact sie mit qualifizierten Expertenmeinungen und Quellen ab. Ist die Nachricht glaubwürdig, teile sie. Wenn nicht, poste eine Klarstellung.
            </p>
            <p>
              Ganz nach dem Motto: Erst klären, dann sharen!
            </p>
            </div>
            </div>
        </div>
        <h1>So prüfst Du Deine Nachricht.</h1>
        <div className="row mt-5 pt-3">
          <div className="col-3">
            <span className="material-icons circle-icon">
              backup
            </span>
          </div>
          <div className="col-9">
            <h3>1. Nachricht hochladen</h3>
            Gib deine Nachricht bei Check the Fact ein. Folgende Möglichkeiten hast du:
            <ul className="purple">
              <li>Links</li>
              <li>Freitexteingabe</li>
              <li>Social Messenger Nachrichten</li>
              <li>Tweets</li>
            </ul>
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
            <ul className="purple">
              <li>Grün: Glaubwürdig. Teilen erwünscht!</li>
              <li>Gelb: Zweifelhaft! Hinweise beachten!</li>
              <li>Rot: Unglaubwürdig. Nicht weitergeben! Klarstellen!</li>
              <li>Grau: Nicht auswertbar. Hinweise beachten!</li>
            </ul>
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
            <div className="container">
                <h1>Trending News zu Corona</h1>
                <ol>
                  
                {news.map(({ name, url }, index) => <li key={index}>
                  <p><a className="purple" href={url} target="_blank" rel="noopener noreferrer">{name}</a></p>
                  </li>)}
               
                </ol>
            </div>

          </div>
        </div>

       {mobileImages}


    </div>
  );
}