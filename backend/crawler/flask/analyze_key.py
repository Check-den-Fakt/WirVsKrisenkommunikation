from azure.cognitiveservices.search.websearch import WebSearchClient
from azure.cognitiveservices.search.websearch.models import SafeSearch
from msrest.authentication import CognitiveServicesCredentials
from subkey import sub_key
import re

subscription_key = sub_key()
client = WebSearchClient("https://westeurope.api.cognitive.microsoft.com/", CognitiveServicesCredentials(subscription_key))


#returnt eine liste von top 5 newswebsiten die dieses keyword in letzter zeit verwendet haben
def az_get_links_for_key (key,menge):
    web_data = client.web.search(query=key, count=menge,market="de-DE",set_lang="DE")
    sites = []
    if hasattr(web_data.web_pages, 'value'):    
        for news in web_data.web_pages.value:
            sites.append(lc_clean_url(news.url))    
    return sites


#räumt die url auf auf format URL.TLD
def lc_clean_url(url):
    try:
        t = re.search(r'\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{1,3}',url).group(0)
    
        t = t.replace("//","")
        t = t.replace("www.","")
        return t
    except:
        return ""

if __name__ == "__main__":
    sites = az_get_links_for_key("corona",10)
    for s in sites:
        print(s)