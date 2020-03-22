#!flask/bin/python
from flask import Flask, make_response, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

@app.errorhandler(404)
def nicht_da(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/crawler/article_trustscore',methods=['GET'])
def article_trust():
    return request.values['test']

if __name__ == '__main__':
    app.run(debug=True)