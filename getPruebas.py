from cgitb import text
import requests
import json
import pandas
import urllib.parse
import urllib3

def token_():
    parameters_= {
        "ClientSecret":"fdaf31a7-d9b6-461b-bf6c-a834d807aa78",
        "ClientId": "e962f0a3-c4ae-4d62-8663-123cd3615ce6"
        }  
    response_=requests.post("https://api.psicoweb.com/login", data = parameters_)
    return json.loads(response_.text)["data"]["token"]

autorizacion = {"Authorization": token_()}
listaCar= []
# listaPrubas=["Cleaver","PVC","Valores","NEC","NIC","NOC","FP16","Terman","Zavic"]
# descargable = requests.get("https://api.psicoweb.com/v1/Puestos", headers = autorizacion)# --> para obtener el nombre de los cargos existentes(buscar "nombre")
#descargable = requests.get("https://api.psicoweb.com/v1/aplicaciones/link/ExcelConcentrado?prueba=NEC&puesto=NECNOCTerVal", headers = autorizacion) -->Para obtner por puesto las pruebas
descargable = requests.get("https://api.psicoweb.com/v1/aplicaciones/link/ExcelConcentrado?prueba=Terman&puesto=NECNOCTerVal", headers = autorizacion)
infoCargos= json.loads(descargable.text).get("data")
linkdes=infoCargos.get("link")
resp = requests.get(linkdes)
open("test.xlsx", "wb").write(resp.content)

# for x in infoCargos:
#     var=x["nombre"]
#     listaCar.append(urllib.parse.quote(var.encode('utf-8')))
    
# for a in listaPrubas:
#     for y in listaCar:
#         try:
#             linkDesc = requests.get("https://api.psicoweb.com/v1/aplicaciones/link/ExcelConcentrado?prueba="+a+"&puesto="+y, headers = autorizacion)

#             print(linkDesc.text)
#         except:
#             print("a")
        

# print (infoCargos [0]['nombre'])
#print( descargable.text)
print(linkdes)