import React, { useState } from 'react';



export default function Rules() {
  // Declare a new state variable, which we'll call "count"
  return (
    <div className="container">
        <h1>Fake-News entlarven</h1>
        <p> Fake-News verlieren ihre Macht, wenn Du sie nicht mehr teilst! Die Flut falscher Nachrichten zum <a href="https://www.infektionsschutz.de/cv/coronavirus.html"><u><i>Coronavirus</i></u></a> verwirrt und richtet Schaden an. Falsche Nachrichten verbreiten sich schnell und wirken selbst wie ein Virus. Mit unserer App kannst Du Corona-Meldungen auf Ihren Wahrheitsgehalt prüfen und von Dir entdeckte Falschmeldungen mitteilen.
        </p>
    <div className="d-flex justify-content-center">
        <div className="polygon background-color-1">
            <div className="container">
            <h1>Diese Fragen solltest Du Dir stellen, um falsche Nachrichten zu entlarven:</h1>
                        <li className="py-2">Werde ich aufgefordert, diese Nachricht zu teilen? (“bitte weiterleiten.”)</li>
                        <li className="py-2">Baut jemand in der Nachricht persönliche Nähe zu mir auf? (“Ich bin die Mutti von XY”)</li>
                        <li className="py-2">Erzählt man mir Geschichten, z.B. aus einem anderen Land? (“In Italien wurde beobachtet…“)</li>
                        <li className="py-2">Zeigt man mir eine Statistik oder Aussagen angeblich bekannter Institutionen oder Personen ohne Quellennachweis? (“10 von 5 am Coronavirus Erkrankte von 2010-2015 …”)</li>
                        <li className="py-2">Werden vereinfachte Schlussforderungen gezogen? (“Italien hat eine alte Bevölkerung, für Alte ist die Krankheit besonders gefährlich. Daher ist es logisch das dort viele Alte erkranken”)</li>
                        <li className="py-2">Werde ich auf Bilder, Videos oder Sprachnachrichten ohne genauere Angaben verwiesen? (“Lange Schlange vor Geschäft X in Stadt Y”).</li>
                        <li className="py-2">Erzählt man mir eine Verschwörungstheorie? (“Z.B.: Das Virus wurde schon im Jahr X in einem Waffenlabor in Land Y entwickelt.”)</li>
                        <li className="py-2">Wird die Aussage stark vereinfacht? (“Es gab schon immer Corona- und Grippe-Viren, daher sind die Corona-Auswirkungen nicht schlimmer als eine normale Grippe-Welle.”)</li>
                        <li className="py-2">Werden mir Vermutungen als Fakten präsentiert? (“Wenn sich genug Leute anstecken, entwickelt sich eine Herdenimmunität und es kann sich nicht mehr verbreiten.”)</li>
            </div>
          </div>
        </div>
        <h1>Das sind die Antworten, wie Du falschen Nachrichten entgegen wirkst:</h1>
        <ol>
            <li>Teile nichts, von dem du nicht weisst, dass es stimmt.</li>
            <li>Mache Dich und andere zuerst schlau und entscheide dann, was stimmt.</li>
            <li>Prüfe Deine Informationen mit unserer App, bevor Du sie verbreitest.</li>
        </ol>
    </div>
  );
}