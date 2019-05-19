from flask import Blueprint, jsonify, request
from uuid import uuid4

from storage.postgres import postgres
from psycopg2 import InternalError, ProgrammingError

import logging
import geocoder


app = Blueprint('issues', __name__)

def error(message):
    return jsonify({
        'status': 'error',
        'message': message
    })

@app.after_request
def cors(res):
    headers = res.headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    headers['Access-Control-Allow-Headers'] = '*'

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

    lat = coordinates.get('lat')
    lng = coordinates.get('lng')

    if not(lat and lng):
        return error('Coordinates are not valid')

    if type(coordinates) != dict:
        return error('Coordinates must be in json')

    try:
        geo_response = geocoder.yandex([lat, lng], method='reverse')
    except ValueError as err:
        return error(str(err))
    
    coordinates = {
        'lat': geo_response.lat,
        'lng': geo_response.lng,
        'address': geo_response.address
    }

    postgres.create_issue(str(uuid4()), name, description, image, coordinates)

    return jsonify('Issue successfully created')

@app.route('/issues/<id>')
def get_issue_by_id(id):
    response = postgres.get_issue_by_id(id)

    return jsonify(response) if response else error("Issue not found")

@app.route('/issues/<id>', methods=['PUT'])
def update_issue(id):
    request_json = request.get_json()

    name = request_json.get('name', '')
    description = request_json.get('description', '')
    image = request_json.get('image', '')
    coordinates = request_json.get('coordinates', {})

    try:
        postgres.update_issue(id, name, description, image, coordinates)
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

@app.route('/issues/<id>/votes', methods=['PUT'])
def change_vote(id):
    postgres.post_issue_votes_by_id(id)

    return jsonify('If id is right, then vote is added')
