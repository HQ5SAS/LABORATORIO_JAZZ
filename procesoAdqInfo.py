from email.mime import image
from PIL import Image
import PIL
from pytesseract import pytesseract
import cv2


pytesseract.tesseract_cmd = 'C:\Program Files\Tesseract-OCR\\tesseract'
#path_to_image = 'imgCleaver.jpg'
#print(pytesseract.image_to_string(path_to_image))
image = PIL.Image.open('imgCleaver.jpg')
#720,330 
new_image = image.resize((1440,660 ))
print(pytesseract.image_to_string(new_image))

