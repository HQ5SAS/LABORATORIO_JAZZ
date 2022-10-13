from email.mime import image
from PIL import Image
from pytesseract import pytesseract
import cv2

imagex= cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
trans_mask = imagex[:,:,3] == 0

pytesseract.tesseract_cmd = 'C:\Program Files\Tesseract-OCR\\tesseract'
path_to_image = 'imgCleaver.jpg'

imagex[trans_mask] = [255, 255, 255, 255]
new_img = cv2.cvtColor(imagex, cv2.COLOR_BGRA2BGR)
print(pytesseract.image_to_string(new_img))


