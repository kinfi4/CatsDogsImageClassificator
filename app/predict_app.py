import numpy as np
from PIL.Image import Image
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array


model = load_model('../model/cat_dog_classifier.h5')


def preprocess_image(image: Image, target_size=(224, 224)):
    if image.mode != 'RGB':
        image = image.convert('RGB')

    image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)

    return image


def predict_image(image):
    preprocessed_image = preprocess_image(image)
    prediction = model.predict(preprocessed_image).tolist()

    return {'dog': prediction[0][0], 'cat': prediction[0][1]}
