from flask import Flask, render_template
from flask.views import MethodView

app = Flask(__name__)


class ImageClassifier(MethodView):
    def get(self):
        return render_template('index.html')


if __name__ == '__main__':
    app.add_url_rule('/home', view_func=ImageClassifier.as_view('main'), methods=('GET', 'POST'))
    app.run()
