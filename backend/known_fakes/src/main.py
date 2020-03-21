from flask import Flask, escape, request
import os
import json
import requests
import pprint
from dotenv import load_dotenv
load_dotenv(verbose=True)
app = Flask(__name__)
pp = pprint.PrettyPrinter(indent=4)

@app.route('/')
def index():
    return f'Use: /check /health'

@app.route('/health')
def health():
    return f'Healthy!'

@app.route('/check', methods=['POST'])
def textcheck():
    request_data = request.get_json(force=True)
    #uri:string, text:string

    # TODO change to correct request schema
    check_text_with_hyscore(request_data["text"])

    # TODO change to correct response schema
    response_data = {"status":"ok"}
    response_json = json.dumps(response_data)
    return f'Check following text\n{response_json} '


def check_text_with_hyscore(text):
    api_url = "https://api.hyscore.io/v3/text"
    HYSCORE_API_KEY = os.getenv("HYSCORE_API_KEY")
    headers = {'Authorization': 'Basic Og==', 'Content-Type':'application/json','x-api-key':HYSCORE_API_KEY}

    print(f"search for {text}")
    r = requests.post(api_url, json = {"text":text, "lang":"DE"}, headers=headers)
    print(pp.pprint(r.json()))


# sample text result
# {   'result': {   'categories': {   'hyscore': [   {   'name': 'health_misc',
#                                                        'weight': 43.983},
#                                                    {   'name': 'politics_misc',
#                                                        'weight': 39.669},
#                                                    {   'name': 'health',
#                                                        'weight': 38.182},
#                                                    {   'name': 'politics',
#                                                        'weight': 34.437}],
#                                     'iab': [   {   'category': 'Health & '
#                                                                'Fitness',
#                                                    'v1': 'IAB7',
#                                                    'v2': 286,
#                                                    'v2-parent': 286,
#                                                    'weight': 43.983},
#                                                {   'category': 'Law, '
#                                                                'Government, & '
#                                                                'Politics',
#                                                    'v1': 'IAB11-4',
#                                                    'v2': 386,
#                                                    'v2-parent': 379,
#                                                    'weight': 39.669},
#                                                {   'category': 'Health & '
#                                                                'Fitness',
#                                                    'v1': 'IAB7',
#                                                    'v2': 286,
#                                                    'v2-parent': 286,
#                                                    'weight': 38.182},
#                                                {   'category': 'Law, '
#                                                                'Government, & '
#                                                                'Politics',
#                                                    'v1': 'IAB11-4',
#                                                    'v2': 386,
#                                                    'v2-parent': 379,
#                                                    'weight': 34.437}]},
#                   'debug': 'Text field deactivated. ',
#                   'language': 'DE',
#                   'readTime': '00:07',
#                   'textLength': 201},
#     'status': {'code': 1, 'message': 'All seems well.', 'type': 'Ok'}}
