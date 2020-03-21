from flask import Flask, escape, request

app = Flask(__name__)

@app.route('/')
def index():
    return f'Use: /check /health'

@app.route('/health')
def health():
    return f'Healthy!'

@app.route('/check')
def textcheck():
    # TODO check url or content
    return f'Check!'
