import logging

from flask import Flask

from app import app as issues_app


app = Flask(__name__)
app.register_blueprint(issues_app)

if __name__ == '__main__':
    logging.basicConfig(format='%(asctime)s %(message)s', level=logging.INFO)

    app.run(debug=True)
