import requests
import numpy as np
import cv2
import tensorflow as tf, sys
from pymongo import MongoClient
from datetime import datetime
from twilio.rest import Client
from credentials import account_sid, auth_token, my_cell, my_twilio

import base64

# Connect to mongodb on local instance
# Connect to activity collection
def connect():
    try:
        conn = MongoClient()
        print("Connected successfully!!!")
    except:
        print("Could not connect to MongoDB")

    # database
    db = conn.database

    # Created or Switched to collection names: my_gfg_collection
    collection = db.activity_test2
    return collection


def create_record(category, score, cam):

    systime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if category == 'positive':
        act = "A weapon threat has been identified with " + str(score*100) + "% confidence"
    else:
        act = "No suspicious activity"

    rec = {
        "activity": act,
        "camera": cam,
        "time": systime
    }

    return rec


def predict(img_arr, cam):
    #print("image prediction ")

    data = base64.b64encode(img_arr)

    with open("imageToPredict.jpeg", "wb") as fh:
        #fh.write(base64.decodestring(data))
        fh.write(base64.standard_b64decode(data))
    # image_data = re.sub('^data:image/.+;base64,', '', image_b64).decode('base64')

    image_path = 'imageToPredict.jpeg'
    # Read in the image_data
    image_data = tf.gfile.FastGFile(image_path, 'rb').read()

    # Loads label file, strips off carriage return
    label_lines = [line.rstrip() for line
                   in tf.gfile.GFile("hackthon/output_labels.txt")]

    # Unpersists graph from file
    with tf.gfile.FastGFile("hackthon/output_graph.pb", 'rb') as f:
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())
        _ = tf.import_graph_def(graph_def, name='')

    with tf.Session() as sess:
        # Feed the image_data as input to the graph and get first prediction
        softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')

        predictions = sess.run(softmax_tensor, \
                               {'DecodeJpeg/contents:0': image_data})

        # Sort to show labels of first prediction in order of confidence
        top_k = predictions[0].argsort()[-len(predictions[0]):][::-1]
        output_string = []
        output_score = []
        final_category = 'negative'
        final_score = 0
        #print("top_k size ", top_k.size)
        for node_id in top_k:
            category = label_lines[node_id]
            score = predictions[0][node_id]
            output_string.append(category)
            output_score.append(score)
            print('Detected as %s score = %.5f)' % (category, score))
            if (category == 'positive' and score > 0.84):

                # code added for the dataset
                final_category = 'positive'
                final_score = score

                print('ALERT ALERT ALERT its %s threat of gun or knife = %.5f)' % (category, score))
                my_msg = "ALERT! A weapon threat is detected on Camera " + str(cam) + ", "+ str(score*100) + "% confidence."
                client = Client(account_sid, auth_token)

                message = client.messages.create(to=my_cell, from_=my_twilio,
                                                 body=my_msg)

        record = create_record(final_category, score, cam)

    return record

def main():

    #connect to database
    collection = connect()

    url = "http://192.168.1.159:8080/shot.jpg"

    while True:
        img_resp = requests.get(url)
        img_arr = np.array(bytearray(img_resp.content), dtype=np.uint8)
        img = cv2.imdecode(img_arr, -1)

        #cv2.imshow("AndroidCam" , img)

        print('------------------------------')
        predicted = predict(img_arr, cam=1)
        print('------------------------------')

        if cv2.waitKey(1) == 27:
            break

        rec = collection.insert_one(predicted)


if __name__ == "__main__":
    main()