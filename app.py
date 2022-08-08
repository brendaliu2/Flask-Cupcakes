"""Flask app for Cupcakes"""

from flask import Flask, request, jsonify, render_template
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
    image = request.json['image'] or None

    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = new_cupcake.serialize()

    return (jsonify(cupcake = serialized), 201)

@app.patch('/api/cupcakes/<int:cupcake_id>')
def update_cupcake(cupcake_id):
    """Update cupcake from request and return it
        -all fields are optional

    Returns 404 or JSON {'cupcake': {id, flavor, size, rating, image}}"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    
    cupcake.flavor = request.json.get('flavor',cupcake.flavor)
    cupcake.size = request.json.get('size',cupcake.size)
    cupcake.rating = request.json.get('rating',cupcake.rating)
    cupcake.image = request.json.get('image',cupcake.image)
    serialized = cupcake.serialize()

    db.session.commit()

    return (jsonify(cupcake = serialized), 201)


@app.delete('/api/cupcakes/<int:cupcake_id>')
def delete_cupcake(cupcake_id):
    """Delete cupcake from request

    Returns 404 or JSON {'deleted': cupcake_id}"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()

    return (jsonify({"deleted": cupcake_id}), 200)

@app.get('/')
def render_main_page():
    """render main page"""

    return render_template('index.html')