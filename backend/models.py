from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
# from werkzeug.security import (
#     generate_password_hash, check_password_hash
# )

db = SQLAlchemy()

"""
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    username = Column(
        String(64),
        unique=True,
        nullable=False
    )
    password = Column(String(128), nullable=False)
    photos = relationship(
        "Photos",
        back_populates="user",
        uselist=True
    )
    comments = relationship(
        "Comment",
        back_populates="user",
        uselist=True
    )
"""

class User(db.Model):
    __tablename__= "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password = db.Column(db.String(256), nullable=False)
    is_active = db.Column(db.Boolean(), default=True)
    
    photos = db.relationship("backend.models.Photo", back_populates="user", uselist=True)
    collections = db.relationship("backend.models.Collection", back_populates="user", uselist=True)
    
    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        self._password = password  # Store plain password directly

    def check_password(self, password):
        return self._password == password  # Compare plain password directly

    def __repr__(self):
        return f"<User {self.email}>"

    def serialize(self, include_photos=False):
        data = {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
        }
        if include_photos:
            data["photos"] = [photo.serialize() for photo in self.photos]
        return data


class Photo(db.Model):
    __tablename__ = "photos"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id')
    )
    # user = db.relationship("backend.models.User", back_populates="photos", uselist=False)
    user = db.relationship("User", back_populates="photos", uselist=False)
    # comments = db.relationship(
    #     "Comment",
    #     back_populates="photo",
    #     uselist=True
    # )
    url = db.Column(db.String(128))
    
    def __repr__(self) -> str:
        return f"Photo {self.id}>"
    
    def serialize(self, include_user=False):
        data = {
            "id": self.id,
            "url": self.url,
        }
        if include_user:
            data["user"] = self.user.serialize()
        return data
    

class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id')
    )
    # user = db.relationship(
    #     "User",
    #     back_populates="comments",
    #     uselist=False
    # )
    photo_id = db.Column(
        db.Integer,
        db.ForeignKey('photos.id')
    )
    # photo = db.relationship(
    #     "Photo",
    #     back_populates="comments",
    #     uselist=False
    # )
    text = db.Column(db.String(512))
    

class Collection(db.Model):
    __tablename__ = "collections"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    description = db.Column(db.Text)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id')
    )
    user = db.relationship("backend.models.User", back_populates="collections", uselist=False)