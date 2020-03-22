import urllib.request as ur, json, html2text, pymongo
from azure.ai.textanalytics import TextAnalyticsClient, TextAnalyticsApiKeyCredential



#load News from tagesschau.de as JSOn
request = ur.urlopen("https://www.tagesschau.de/api2/news/")
data = json.loads(request.read().decode())
#json_File = json.load(request.decode())

#connect to azure cosmosdb
uri = "mongodb://pagecrawlerdb:TdhFfiPGVDveqYgXaDS3uRGvumzm79GLvs6AulOg8h0FxiISCCrOvKwFWIHDfE5IG54IQbe96nQhnl4dbwkLKw==@pagecrawlerdb.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@pagecrawlerdb@&retrywrites=false"
client = pymongo.MongoClient(uri)
db = client.tagesschau

#endpoint and key for azure cognitive services
cognitiveKey = "a8dadd0c8d6d4d2280a576e6976b1317"
cognitiveEndPoint = "https://westeurope.api.cognitive.microsoft.com/"

#parser from html-code to text
text_maker = html2text.HTML2Text()
text_maker.ignore_links = True
text_maker.ignore_images = True

articles = []


#seperates Text in list of chunks(coginitve service cant handle more  than 5120 letters)
def sliceTextToChunks(text, chunksize):

    chunks = []

    lastPos = 0;
    pos = 0;

    reachedEnd = False
    while(True):
        pos += chunksize
        if(pos >= len(text)):
            pos = len(text)-1
            reachedEnd = True
        while(text[pos] != " "):
            pos -= 1
        chunks.append(text[lastPos:pos])
        lastPos = pos
        if(reachedEnd):
            break
       
    if(len(chunks) == 0):
        return text
    else:
        return chunks

#load news (main function
def loadTagesschauNews():
    articleList = []
    request = ur.urlopen("https://www.tagesschau.de/api2/news/")
    data = json.loads(request.read().decode())
    for news in data['news']:

        sophId = news['sophoraId']
        match = db.articles.find_one({'sophoraId' : sophId})
        if(news['type'] == 'story' and match == None):
            article = {'sophoraId': news['sophoraId'],'type': 'story', 'url': news['detailsweb'],'keyPhrases': [], 'detailsJson': news['details'],'date' : news['date']}
            text = getArticleFromJson(article['detailsJson'])
            text = text.replace("\n", " ")
            textChunks = sliceTextToChunks(text, 2000)
            keyPhrasesResult = keyPhraseExtraction(textChunks)
            if(keyPhrasesResult['is_error'] == False):
                article['keyPhrases'] = keyPhrasesResult.key_phrases
            articleList.append(article)

        
    return articleList

def getArticleFromJson(articleJson):
    articleString = ""

    request = ur.urlopen(articleJson)
    data = json.loads(request.read().decode())

    for part in data['content']:
        if(part['type'] == "text"):
            articleString += part['value']
    articleString = text_maker.handle(articleString)
    return articleString



def pushArticelsToMongo(articles):

    for a in articles:
        match = db.articles.find_one({'sophoraId' : a['sophoraId']})
        if(match == None):
            db.articles.insert_one(a)
        else:
            print(a['sophoraId'])



def getArticlesFromMongo():
    mongoArticles = []
    documents = db.articles.find();
    for doc in documents:
        mongoArticles.append(doc)
    return mongoArticles


#Text Analysing
def authenticate_cognitivClient():
    ta_credential = TextAnalyticsApiKeyCredential(cognitiveKey)
    text_analytics_client = TextAnalyticsClient(
            endpoint=cognitiveEndPoint, credential=ta_credential)
    return text_analytics_client

client = authenticate_cognitivClient()


def keyPhraseExtraction(document):

    try:
        

        response = client.extract_key_phrases(inputs= document)[0]

        if not response.is_error:
            return response
        else:
            print(response.id, response.error)

    except Exception as err:
        print("Encountered exception. {}".format(err))
        




#print(data['news'][0])
mongoArticles = getArticlesFromMongo()
#latestSophoraId = mongoArticles[0]['sophoraId']


articles = loadTagesschauNews()

pushArticelsToMongo(articles)
#print(articles)
#for news in data['news']:
#    print(news['details'])

sprint("ende")


