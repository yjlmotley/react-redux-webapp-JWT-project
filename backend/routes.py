"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from backend.models import db, User, Photo
from flask_cors import CORS
from flask_jwt_extended import create_access_token, current_user, jwt_required
from datetime import timedelta
from werkzeug.security import check_password_hash, generate_password_hash

api = Blueprint('api', __name__, url_prefix="/api")

# Allow CORS requests to this API
CORS(api)



@api.route('/sign_up', methods=['POST'])
def handleSignUp():
    try:
        email = request.json.get('email')
        password = request.json.get('password')
        
        if not email or not password:
            return jsonify({"msg": "Email and password are required."}), 400
        
        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({"msg": "User already exists."}), 400
        
        # Store the password directly as plain text
        new_user = User(email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"msg": "User created successfully."}), 201
    
    except Exception as e:
        print(f"Exception in handleSignUp(): {str(e)}")
        return jsonify({"msg": "Internal Server Error"}), 500


@api.route('/log_in', methods=['POST'])
def handleLogIn():
    try:
        email = request.json.get('email')
        password = request.json.get('password')

        if not email or not password:
            return jsonify({"msg": "Email and password are required."}), 400

        user = User.query.filter_by(email=email).first()

        if user is None or user.password != password:
            return jsonify({"msg": "Invalid email or password"}), 401

        # Creating access token with expiration time of 3 days
        expiration = timedelta(days=3)
        access_token = create_access_token(identity=user.id, expires_delta=expiration)

        return jsonify({"token": access_token}), 200
        return jsonify({"msg": "User created successfully."}), 201

    except Exception as e:
        print(f"Exception in handleLogIn(): {str(e)}")
        return jsonify({"msg": "Internal Server Error"}), 500

@api.route('/authenticate_user', methods=['POST'])
@jwt_required()
def authenticate():
    return jsonify(msg = "authenticated valid user")
    

@api.route("/photos", methods=["POST"])
@jwt_required()
def create_photo():
    """
    Body:
    {
        "url": "https://wob.site/photo.jpg",
    }
    """
    data = request.json
    user = current_user

    if not user:
        return jsonify(msg="User does not exist."), 404
    
    photo = Photo(url=data.get("url"))
    user.photos.append(photo)
    db.session.merge(user)
    db.session.commit()
    db.session.refresh(photo)
    return jsonify(photo.serialize(include_user=True))


@api.route("/photos", methods=["GET"])
def read_many_photos():
    photos = Photo.query.all()
    return jsonify(photos=[photo.serialize(include_user=True) for photo in photos])


@api.route("/photos/<int:id>", methods=["GET"])
def read_single_photo(id: int):
    photo = Photo.query.filter_by(id=id).first()
    if not photo:
        return jsonify(msg="Photo does not exist."), 404
    return jsonify(photo.serialize(include_user=True))


@api.route("/photos/<int:id>", methods=["PUT"])
def update_photo(id: int):
    """
    Body:
    {
        "url": "https://wob.site/photo.jpg",
    }
    """
    photo = Photo.query.filter_by(id=id).first()
    data = request.json

    if not photo:
        return jsonify(msg="Photo does not exist."), 404
    
    photo.url = data.get("url")
    db.session.merge(photo)
    db.session.commit()
    db.session.refresh(photo)
    return jsonify(photo.serialize(include_user=True))


@api.route("/photos/<int:id>", methods=["DELETE"])
def delete_photo(id: int):
    photo = Photo.query.filter_by(id=id).first()

    if not photo:
        return jsonify(msg="Photo does not exist."), 404
    
    db.session.delete(photo)
    db.session.commit()
    return "", 204