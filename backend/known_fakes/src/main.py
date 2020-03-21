from flask import Flask, escape, request
import os
from dotenv import load_dotenv
load_dotenv(verbose=True)

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
    DATABASE_URL = os.getenv("DATABASE_URL")

#    The API v3 endpoint for URL/Website analysis is https://api.hyscore.io/v3/url
#The API v3 endpoint for TEXT (only) analysis is https://api.hyscore.io/v3/text


    return f'Check {DATABASE_URL}!'
