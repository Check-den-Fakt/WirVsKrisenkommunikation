from analyze_text import az_get_keywords
from analyze_key import az_get_links_for_key
from collections import Counter
if __name__ == "__main__":
    realTxt = 'DRINGEND!!!! Sag bitte allen Leuten in deiner WhatsUp-Liste, dass sie den Kontakt "Tobias Mathis" nicht annehmen sollen! Das ist ein Virus (über WhatsUp) der die ganze Festplatte zerstört und sich die Daten runter zieht. Wenn ihn einer deiner Kontakte erwischt, bist du auch betroffen, weil er sich durch die Liste frisst! Wenn dich die Nummer 01719626509 anruft, nimm ja nicht ab! Ist ein Hacker und es werden auch all deine Kontakte betroffen sein! Es ist heute morgen auch von EUROP1 und SAT1 bestätigt worden! Weiterleiten!!'
    
    #keywords auswerten
    keywords = az_get_keywords(realTxt)

    #quellen suchen
    urllisten = []
    for keyword in keywords:
        urllisten.append(az_get_links_for_key(keyword))

    #2d array zu 1.
    quellen = []
    for urlliste in urllisten:
        for url in urlliste:
            quellen.append(url)

    #nach anzahl sortieren
    quellenCount = Counter(quellen)

    print(quellenCount)
    #rückgeben