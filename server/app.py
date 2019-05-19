from flask import Blueprint, jsonify, request
from uuid import uuid4

from storage.postgres import postgres
from psycopg2 import InternalError, ProgrammingError

import logging


app = Blueprint('issues', __name__)

def error(message):
    return jsonify({
        'status': 'error',
        'message': message
    })

@app.after_request
def cors(res):
    header = res.headers
    header['Access-Control-Allow-Origin'] = '*'

    return res

@app.route('/issues')
def get_issues():
    issues = postgres.get_issues()

    return jsonify(issues)

@app.route('/issues', methods=['POST'])
def create_issue():
    request_json = request.get_json()

    if len(request_json) < 4:
        return error('Not enough data for issue creation')
    
    name = request_json['name']
    description = request_json['description']
    image = request_json['image']
    coordinates = request_json['coordinates']

    if type(coordinates) != dict:
        return error('Coordinates must be in json')

    postgres.create_issue(str(uuid4()), name, description, image, coordinates)

    return jsonify('Issue successfully created')

@app.route('/issues/<id>')
def get_issue_by_id(id):
    response = postgres.get_issue_by_id(id)

    return response if response else error("Issue not found")

@app.route('/issues/<id>', methods=['PUT'])
def update_issue(id):
    request_json = request.get_json()

    name = request_json.get('name', '')
    description = request_json.get('description', '')
    image = request_json.get('image', '')
    coordinates = request_json.get('coordinates', {})

    try:
        postgres.put_issue(id, name, description, image, coordinates)
    except ProgrammingError as err:
        return error(str(err))

    return jsonify("Successfully updated")

@app.route('/issues/<id>', methods=['DELETE'])
def delete_issue(id):
    postgres.delete_issue_by_id(id)

    return jsonify('If id is right, then issue is deleted')

@app.route('/issues/<id>/votes')
def get_issue_votes(id):
    response = postgres.get_issue_votes_by_id(id)

    return response[0][0] if response else error('Issue not found')

@app.route('/issues/<id>/votes', methods=['POST'])
def change_vote(id):
    postgres.post_issue_votes_by_id(id)

    return jsonify('If id is right, then vote is added')
