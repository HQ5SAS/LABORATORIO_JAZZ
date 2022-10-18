import requests
import json
parameters_= {
    "ClientSecret":"fdaf31a7-d9b6-461b-bf6c-a834d807aa78",
    "ClientId": "e962f0a3-c4ae-4d62-8663-123cd3615ce6"
     }  
response_=requests.post("https://api.psicoweb.com/login", data = parameters_)
print(json.loads(response_.text)["data"]["token"])
