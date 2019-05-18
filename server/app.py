from flask import Blueprint, jsonify, request


app = Blueprint('issues', __name__)

@app.route('/issues')
def get_issues():
    return jsonify([])

@app.route('/issues', methods=['POST'])
def create_issue():
    request_json = request.get_json()
    
    name = request_json['name'] if request_json else ''
    description = request_json['description'] if request_json else ''
    image = request_json['image'] if request_json else ''
    coordinates = request_json['coordinates'] if request_json else ''
    
    return jsonify({})

@app.route('/issues/<id>')
def get_issue_by_id(id):

    return jsonify({})

@app.route('/issues/<id>', methods=['PUT'])
def update_issue(id):
    request_json = request.get_json()

    name = request_json.get('name')
    description = request_json.get('description')
    image = request_json.get('image')
    coordinates = request_json.get('coordinates')

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
