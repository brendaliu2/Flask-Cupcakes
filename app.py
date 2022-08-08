"""Flask app for Cupcakes"""

from flask import Flask, request, jsonify
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
connect_db(app)


@app.get('/api/cupcakes')
def get_cupcakes():
    """Returns JSON {'cupcakes': [{id, flavor, size, rating, image}, ...]}"""

    cupcakes = Cupcake.query.all()
    serialized = [c.serialize() for c in cupcakes]

    return jsonify(cupcakes = serialized)


@app.get('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):
    """ Returns JSON {'cupcake': {id, flavor, size, rating, image}}"""

    cupcake = Cupcake.query.get(cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake = serialized)


@app.post('/api/cupcakes')
def post_cupcake():
    """
    Create cupcake from request and return it

    Returns JSON {'cupcake': {id, flavor, size, rating, image}}"""

    flavor = request.json['flavor']
    size = request.json['size']
    rating = request.json['rating']
    if not request.json.get('image'): 
        image = None
    else:
        image = request.json['image']


    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()

    return (jsonify(cupcake = serialized), 201)


