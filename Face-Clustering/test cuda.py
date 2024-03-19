import dlib
import cv2

def test_cuda_with_dlib(image_path):
    # Load image using OpenCV
    image = cv2.imread(image_path)
    if image is None:
        print("Could not load image.")
        return

    # Convert image from BGR (OpenCV format) to RGB (dlib format)
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Initialize face detector
    cnn_face_detector = dlib.cnn_face_detection_model_v1('mmod_human_face_detector.dat')

    print("Testing CUDA functionality with dlib...")

    # Perform face detection
    try:
        detections = cnn_face_detector(rgb_image, 1)
        print(f"Detected {len(detections)} faces.")
        print("CUDA is working with dlib.")
    except RuntimeError as e:
        print(f"Error during face detection: {e}")
        print("CUDA may not be working with dlib.")

if __name__ == "__main__":
    # Path to an image file
    image_path = "..\\public\\images\\01098446132 (1).jpg"
    test_cuda_with_dlib(image_path)
