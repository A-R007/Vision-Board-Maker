from flask import Flask, jsonify, request
import os
import requests

app = Flask(__name__)

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

@app.route("/generate-quote", methods=["GET"])
def generate_quote():
    prompt = "Generate an inspiring quote."
    response = requests.post(
        "https://api.groq.com/v1/generate",
        headers={"Authorization": f"Bearer {GROQ_API_KEY}"},
        json={"prompt": prompt}
    )
    data = response.json()
    return jsonify({"quote": data.get("output", "Stay positive and keep pushing forward!")})

if __name__ == "__main__":
    app.run(debug=True)
