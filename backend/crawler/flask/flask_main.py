#!flask/bin/python
from flask import Flask, make_response, request, jsonify, abort

from analyze_text import az_get_keywords
from analyze_key import az_get_links_for_key
from collections import Counter

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

@app.errorhandler(404)
def nicht_da(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/crawler/quellen',methods=['POST'])
def quellen():
    #sicherstellen die request ist gut
    if request.method == "GET":
        abort(500)
    
    if "quellen" not in request.form:
        abort(400)
    if "keywords" not in request.form:
        abort(400)
    if "text" not in request.form:
        abort(400)

    text = request.form["text"]
    quellenCount = request.form["quellen"]
    keywordsCount = request.form["keywords"]

    #request ausführen
    #keywords auswerten
    keywords = az_get_keywords(text,keywordsCount)

    #quellen suchen
    urllisten = []
    for keyword in keywords:
        urllisten.append(az_get_links_for_key(keyword,quellenCount))

    #2d array zu 1.
    quellen = []
    for urlliste in urllisten:
        for url in urlliste:
            quellen.append(url)

    #nach anzahl sortieren
    sortierteQuellen = Counter(quellen)

    return jsonify(sortierteQuellen)

    #rückgabe

if __name__ == '__main__':
    app.run()