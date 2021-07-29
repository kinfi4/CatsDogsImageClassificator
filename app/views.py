from flask import render_template, request, jsonify
from flask.views import MethodView

from app import app
from predict_app import predict_image


class MainPageView(MethodView):
    def get(self):
        return render_template('index.html')


class ImagePredictView(MethodView):
    def post(self):
        uploaded_image = request.files['image']
        print(uploaded_image)

        return jsonify({'response': 'ok'})


app.add_url_rule('/', view_func=MainPageView.as_view('main_page'), methods=('GET', ))
app.add_url_rule('/predict', view_func=MainPageView.as_view('predict'), methods=('POST', ))
