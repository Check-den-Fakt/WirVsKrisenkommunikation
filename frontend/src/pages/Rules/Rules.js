import React, { useState } from 'react';



export default function Rules() {
  // Declare a new state variable, which we'll call "count"
  return (
    <div className="container">
        <div className="pt-5 d-flex justify-content-center">
            <div className="polygon background-color-1">
                <div className="container">
                    <h2>Fake-News verlieren ihre Macht, wenn Du sie nicht mehr teilst</h2>
                    <p>CDie Flut falscher Nachrichten zum <u><i>Coronavirus verwirrt</i></u> und richtet Schaden an. Falsche Nachrichten verbreiten sich schnell und wirken selbst wie ein Virus. Mit unserer App kannst Du Corona-Meldungen auf Ihren Wahrheitsgehalt prüfen und von Dir entdeckte Falschmeldungen mitteilen.
                    </p>
                </div>
            </div>
        </div>
        <h1>Diese Fragen solltest Du Dir stellen, um falsche Nachrichten zu entlarven:</h1>
            <div className="col-9">
                <ul>
                    <li>Werde ich aufgefordert, diese Nachricht zu teilen? (“bitte weiterleiten.”)</li>
                    <li>Baut jemand in der Nachricht persönliche Nähe zu mir auf? (“Ich bin die Mutti von XY”)</li>
                    <li>Erzählt man mir Geschichten, z.B. aus einem anderen Land? (“In Italien wurde beobachtet…“)</li>
                    <li>Zeigt man mir eine Statistik oder Aussagen angeblich bekannter Institutionen oder Personen ohne Quellennachweis? (“10 von 5 am Coronavirus Erkrankte von 2010-2015 …”)</li>
                    <li>Werden vereinfachte Schlussforderungen gezogen? (“Italien hat eine alte Bevölkerung, für Alte ist die Krankheit besonders gefährlich. Daher ist es logisch das dort viele Alte erkranken”)</li>
                    <li>Werde ich auf Bilder, Videos oder Sprachnachrichten ohne genauere Angaben verwiesen? (“Lange Schlange vor Geschäft X in Stadt Y”).</li>
                    <li>Erzählt man mir eine Verschwörungstheorie? (“Z.B.: Das Virus wurde schon im Jahr X in einem Waffenlabor in Land Y entwickelt.”)</li>
                    <li>Wird die Aussage stark vereinfacht? (“Es gab schon immer Corona- und Grippe-Viren, daher sind die Corona-Auswirkungen nicht schlimmer als eine normale Grippe-Welle.”)</li>
                    <li>Werden mir Vermutungen als Fakten präsentiert? (“Wenn sich genug Leute anstecken, entwickelt sich eine Herdenimmunität und es kann sich nicht mehr verbreiten.”)</li>
                </ul>
            </div>
        <div className="pt-5 d-flex justify-content-center">
            <div className="polygon background-color-2">
                <div className="container">
                    <h1>Das sind die Antworten, wie Du falschen Nachrichten entgegen wirkst:</h1>
                    <ol>
                        <li>Teile nichts, von dem du nicht weisst, dass es stimmt.</li>
                        <li>Mache Dich und andere zuerst schlau und entscheide dann, was stimmt.</li>
                        <li>Prüfe Deine Informationen mit unserer App, bevor Du sie verbreitest.</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
  );
}