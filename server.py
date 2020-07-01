# Flask server
from flask import Flask, request, jsonify
app = Flask(__name__)


@app.route("/getData")
def get_data():
    with open("data.txt", "r") as f:
        return jsonify({
            "masks": f.readline(),
            "non-masks": f.readline(),
        })


if __name__ == "__main__":
    app.run()
