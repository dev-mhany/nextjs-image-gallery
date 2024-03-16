# USAGE
# python encode_faces.py --dataset dataset --encodings encodings.pickle

# import the necessary packages
from imutils import paths
# face_recognition library by @ageitgey
import face_recognition
# argument parser
import argparse
# pickle to save the encodings
import pickle
# openCV
import cv2
# operating system
import os
import time
from constants import ENCODINGS_PATH, DATASET_PATH

def is_blurry(image, threshold=50):
    """
    Check if the given image is blurry.

    Parameters:
    - image: The image data (as read by cv2.imread)
    - threshold: The threshold to classify an image as blurry

    Returns:
    - True if the image is blurry, False otherwise
    """
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    variance = cv2.Laplacian(gray, cv2.CV_64F).var()
    return variance < threshold

def is_low_res(image, min_resolution=(40, 40)):
    """
    Check if the given image is of low resolution.

    Parameters:
    - image: The image data (as read by cv2.imread)
    - min_resolution: The minimum acceptable resolution (width, height)

    Returns:
    - True if the image is of low resolution, False otherwise
    """
    height, width = image.shape[:2]
    return width < min_resolution[0] or height < min_resolution[1]

def filter_box(image,box):
    (top, right, bottom, left) = box
    face = image[top:bottom, left:right]
    filterd = True
    if(is_low_res(face)):
        os.makedirs("./low", exist_ok=True)
        cv2.imwrite(os.path.join("./low", str(time.time())+".jpg"), face)
        filterd = False
    if(is_blurry(face)):
        os.makedirs("./blury", exist_ok=True)
        cv2.imwrite(os.path.join("./blury", str(time.time())+".jpg"), face)
        filterd = False
    
    return filterd

if __name__=='__main__':
    # construct the argument parser and parse the arguments
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--dataset", default=DATASET_PATH,
                    help="path to input directory of faces + images")
    ap.add_argument("-e", "--encodings", default=ENCODINGS_PATH,
                    help="path to serialized database of facial encodings")
    ap.add_argument("-d", "--detection_method", type=str, default="hog",
                    help="face detection model to use: either `hog` or `cnn`")
    args = vars(ap.parse_args())

    # create, if not exists, structures of directories
    dir_encodings_path = os.path.dirname(args["encodings"])
    if not os.path.exists(dir_encodings_path):
        # create dirs if not exists
        os.makedirs(dir_encodings_path, exist_ok=True)

    # grab the paths to the input images in our dataset, then initialize
    # out data list (which we'll soon populate)
    print("[INFO] quantifying faces...")
    imagePaths = list(paths.list_images(args["dataset"]))
    data = []

    # loop over the image paths
    for (i, imagePath) in enumerate(imagePaths):
        # load the input image and convert it from RGB (OpenCV ordering)
        # to dlib ordering (RGB)
        print("[INFO] processing image {}/{}".format(i + 1,
                                                     len(imagePaths)))
        print(imagePath)

        # loading image to BGR
        image = cv2.imread(imagePath)

        # converting image to RGB format

        # detect the (x, y)-coordinates of the bounding boxes
        # corresponding to each face in the input image
        boxes = face_recognition.face_locations(image,
                                                model=args["detection_method"])

        filtered_boxes = [x for x in boxes if filter_box(image,x)]

        # compute the facial embedding for the face
        encodings = face_recognition.face_encodings(image, filtered_boxes)

        # build a dictionary of the image path, bounding box location,
        # and facial encodings for the current image
        d = [{"imagePath": imagePath, "loc": box, "encoding": enc}
             for (box, enc) in zip(filtered_boxes, encodings)]
        data.extend(d)

    # dump the facial encodings data to disk
    print("[INFO] serializing encodings...")
    with open(args["encodings"], "wb") as f:
        f.write(pickle.dumps(data))
    print("Encodings of images saved in {}".format(args['encodings']))
