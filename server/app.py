from flask import Blueprint, jsonify, request
from uuid import uuid4

from storage.postgres import postgres


app = Blueprint('issues', __name__)

def error(message):
    return jsonify({
        'status': 'error',
        'message': message
    })

@app.route('/issues')
def get_issues():
    issues = postgres.get_issues()

    return jsonify(issues)

@app.route('/issues', methods=['POST'])
def create_issue():
    if not request.is_json():
        return error('Not a JSON request')
    
    request_json = request.get_json()
    
    name = request_json['name']
    description = request_json['description']
    image = request_json['image']
    coordinates = request_json['coordinates']

    postgres.create_issue(uuid4(), name, description, image, coordinates)
    
    return jsonify({})

@app.route('/issues/<id>')
def get_issue_by_id(id):

    return jsonify({})

@app.route('/issues/<id>', methods=['PUT'])
def update_issue(id):
    request_json = request.get_json()

    name = request_json.get('name', '')
    description = request_json.get('description', '')
    image = request_json.get('image', '')
    coordinates = request_json.get('coordinates', '')

    return jsonify({})

@app.route('/issues/<id>', methods=['DELETE'])
def delete_issue(id):
    return jsonify({})

@app.route('/issues/<id>/votes')
def get_issue_votes(id):
    return jsonify({})

@app.route('/issues/<id>/votes', methods=['POST'])
def change_vote(id):
    return jsonify({})
