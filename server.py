# Flask server
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route("/getData")
def get_data():
    with open("data.txt", "r") as f:
        return jsonify({
            "masks": f.readline(),
            "nonmasks": f.readline(),
        })


if __name__ == "__main__":
    app.run(debug=False, port=5000, host='0.0.0.0')
