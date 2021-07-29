import base64
import io

from PIL import Image
from flask import render_template, request, jsonify
from flask.views import MethodView

from app import app
from predict_app import predict_image


class MainPageView(MethodView):
    def get(self):
        return render_template('index.html')


class ImagePredictView(MethodView):
    def post(self):
        image_encoded = request.get_json(force=True)['image']
        image_decoded = base64.b64decode(image_encoded)
        image = Image.open(io.BytesIO(image_decoded))
        prediction = predict_image(image)
        print('Made prediction,', prediction)

        return jsonify(prediction)


app.add_url_rule('/', view_func=MainPageView.as_view('main_page'), methods=('GET', ))
app.add_url_rule('/predict', view_func=ImagePredictView.as_view('predict'), methods=('POST', ))
