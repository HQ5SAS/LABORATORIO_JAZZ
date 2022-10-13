import PyPDF2 
from PyPDF2 import PdfReader

reader = PdfReader("ReporteResultados.pdf")
number_of_pages = len(reader.pages)
page = reader.pages[0]
text = page.extract_text()
#textFixed = text[300 : 3000].replace(".", " ")
#textFixed1= [int(s) for s in str.split(textFixed) if s.isdigit()]
print (text)