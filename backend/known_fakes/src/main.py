from flask import Flask, escape, request
import os
import json
from dotenv import load_dotenv
load_dotenv(verbose=True)
app = Flask(__name__)

@app.route('/')
def index():
    return f'Use: /check /health'

@app.route('/health')
def health():
    return f'Healthy!'

@app.route('/check', methods=['POST'])
def textcheck():
    request_data = request.get_json(force=True)

    # TODO change to correct request schema
    check_text_with_hyscore(request_data["mydata"])

    # TODO change to correct response schema
    response_data = {"status":"ok"}
    response_json = json.dumps(response_data)
    return f'Check following text\n{response_json} '


def check_text_with_hyscore(text):
    api_url = "https://api.hyscore.io/v3/text"
    HYSCORE_API_KEY = os.getenv("HYSCORE_API_KEY")
    print(f"search for {text}")
    # TODO call API with text

