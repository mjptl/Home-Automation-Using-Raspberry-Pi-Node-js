import json
import threading
from time import sleep
from requests import get
from cv2 import VideoCapture,imwrite,CAP_DSHOW
from watson_developer_cloud import VisualRecognitionV3

visual_recognition = VisualRecognitionV3('2018-03-19',iam_apikey='5mZ_49J41rVBfJdLXFd47jcbbsQWm71yMpqZorMzxUSa')
camera = VideoCapture(0)

ir = 1
url = "https://ecad-project.eu-gb.cf.appdomain.cloud/data"

# functions ==> cloud-1 (Node)
def check_connection():
    try:
        get("https://www.google.com/")
        print("Connection ==> 1,",end=' ')
        return 1
    except:
        print("Connection ==> 0",end=' ')
        return 0
def get_data(url):
    try:
        data = get(url)
        print("Data Fetch Successfull")
        return json.loads(data.text)
    except:
        print("Data Fetch Unsuccessfull")
        return 0
def write_IO(data):
    print("WRITING IO:{}".format(data))

# functions ==> cloud-2 (Visual Recognition)
def scan_ir():
    print("Sensor => {}".format(ir))
    if ir == 1:
        return 1
    else:
        return 0
def take_photo():
    camera = VideoCapture(0,CAP_DSHOW)
    flag, image = camera.read()
    imwrite('opencv.png', image)
    del(camera)
    return flag,image 
def recognition_img(imgname):
    with open(imgname, 'rb') as images_file:
        data = visual_recognition.classify(images_file,threshold='0.6',classifier_ids='DefaultCustomModel_1849095925').get_result()
    img_class = data['images'][0]['classifiers'][0]['classes'][0]['class']
    print("image Class ==> ",img_class,'('+str(data['images'][0]['classifiers'][0]['classes'][0]['score'])+')')
    if img_class == "Nomask":
        return 0
    else:
        return 1

# thread ==> 1
def cloud_node():
    while True:
        sleep(2)
        if check_connection() == 1:
            data = get_data(url)
            if data != 0:
                write_IO(data)

# thread ==> 2
def cloud_visual():
    while True:
        if scan_ir() == 1:
            flag,image = take_photo()
            sleep(5)
            if flag == 1:
                print("Image Captured, Scanning image on IBM cloud...")
                recognition_img('opencv.png')

t1 = threading.Thread(target=cloud_node)
t2 = threading.Thread(target=cloud_visual)

t1.start()
t2.start()