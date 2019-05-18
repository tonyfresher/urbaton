import psycopg2 as pg

from app import app
from flask import jsonify

@app.route('/issues')
def get_issues():
    return jsonify([])


@app.route('/issues', methods=['POST'])
def create_issue():
    name = ""
    description = ""
    image = ""
    coordinates = ""

    json = {
        "name": name,
        "description": description,
        "image": image,
        "coordinates": coordinates
    }

    return jsonify(json)


@app.route('/issues/<id>')
def get_issue_by_id(id):
    return {
        "uid": "",
        "name": "",
        "description": "",
        "image": "",
        "coordinates": {"lat": 0.0, "lon": 0.0},
        "votes": ""
    }


@app.route('/issues/<id>', methods=['PUT'])
def update_issue(id):
    return True


@app.route('/issues/id', methods=["DELETE"])
def delete_issue(id):
    return True


@app.route('/issues/<id>/votes')
def get_issue_votes(id):
    return {"amount": 0}


@app.route('/issues/<id>/votes', methods=["POST"])
def change_vote(id):
    return {"enable": True}


@app.route('/issues/<id>/money')
def get_amount_of_money(id):
    return {"amount": 0.0}


@app.route('/issues/<id>/money', methods=["POST"])
def send_money(id):
    return True
