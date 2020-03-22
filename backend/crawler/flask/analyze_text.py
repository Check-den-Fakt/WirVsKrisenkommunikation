#vincent
#Frag bei der Azure CogService Api an und wandelt text in keywords um
import requests
import json
from subkey import sub_key

from collections import Counter

#Gibt eine Liste von keywords nach anzahl im Text zurück
def az_get_keywords(text, menge):
    endpunkt = 'https://westeurope.api.cognitive.microsoft.com/'
    language_api = endpunkt + "/text/analytics/v2.1/keyphrases"
    sub_key = sub_key()

    payload = {"documents": [
    {"id": "1", "text": text}]}
    header = {"Ocp-Apim-Subscription-Key": sub_key}
    response = requests.post(language_api, headers=header, json=payload)
    keywords = response.json()['documents'][0]['keyPhrases']
    c =  Counter(keywords).most_common(10)
    return c


if __name__ == "__main__":
    realTxt = 'DRINGEND!!!! Sag bitte allen Leuten in deiner WhatsUp-Liste, dass sie den Kontakt "Tobias Mathis" nicht annehmen sollen! Das ist ein Virus (über WhatsUp) der die ganze Festplatte zerstört und sich die Daten runter zieht. Wenn ihn einer deiner Kontakte erwischt, bist du auch betroffen, weil er sich durch die Liste frisst! Wenn dich die Nummer 01719626509 anruft, nimm ja nicht ab! Ist ein Hacker und es werden auch all deine Kontakte betroffen sein! Es ist heute morgen auch von EUROP1 und SAT1 bestätigt worden! Weiterleiten!!'
    trikTxt = 'Auch medizinische Hinweise werden online geteilt. So warnt die Medizinische Uni Wien auf Twitter vor WhatsApp-Nachrichten, in denen unter Verweis auf angebliche Forschungsergebnisse der Universität Zusammenhänge zwischen der Einnahme von Ibuprofen und COVID-19 hergestellt werden. Zwar riet auch die WHO zwischenzeitlich dazu, eher zu alternativen Medikamenten zu greifen, mit Forschung der Uni Wien hatte dies aber wenig zu tun. Mittlerweile hat die Gesundheitsorganisation zudem ihre vorsichtige Warnung vor dem Medikament zurückgezogen.Die Episode zeigt, wie wissenschaftliche Unsicherheit und in sozialen Medien kursierende Gerüchte sich gegenseitig bedingen können. Natürlich: Diskussionen sowie gegensätzliche Einschätzungen eines Sachverhaltes sind elementarer Teil wissenschaftlicher Debatte. Doch in verkürzten Darstellungen oder Gerüchten in den sozialen Medien fehlen wichtige Elemente wie Peer-Reviewing-Verfahren und eine eindeutig zuordenbare Autor:innenschaft, die wissenschaftliche Praxis auszeichnen. So wird Unsicherheit genährt und Vertrauen in wissenschaftliche Erkenntnisse erodiert.Während Forderungen nach einer stärkeren Ahndung von Corona-bezogenen „Fake News“ laut werden, geben wir deshalb hier einen Überblick über Aufklärungsseiten, die den wichtigen Schritt gehen, Falschnachrichten im Netz richtig zu stellen und wissenschaftliche Erkenntnisse aufzubereiten.'
    keywords = az_get_keywords(trikTxt,10)

