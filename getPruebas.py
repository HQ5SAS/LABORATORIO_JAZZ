import requests
import json

def token_():
    parameters_= {
        "ClientSecret":"fdaf31a7-d9b6-461b-bf6c-a834d807aa78",
        "ClientId": "e962f0a3-c4ae-4d62-8663-123cd3615ce6"
        }  
    response_=requests.post("https://api.psicoweb.com/login", data = parameters_)
    return json.loads(response_.text)["data"]["token"]

autorizacion = {"Authorization": token_()}

descargable = requests.get("https://api.psicoweb.com/v1/aplicaciones/link/ExcelConcentrado?prueba=NIC&cedula=53102572req18332&puesto=NICVal", headers = autorizacion)
print( descargable.text)