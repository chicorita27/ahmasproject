from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})



try:
    model  = joblib.load("random_forest_airbrake.pkl")
    scaler = joblib.load("airbrake_scaler.pkl")
    print("✅ Model and scaler loaded")
except Exception as e:
    print("❌ Model load failed:", repr(e))
    raise                     # re‑throw so we see the full traceback

FEATURES = [
    
    "brake_pressure",
    "ambient_temperature",
    "brake_temperature",
    "air_leak_rate",
    "vibration_level",
    "brake_response_time",
    "train_speed",
]

@app.route("/", methods=["GET"])
def home():
    return "🚂 AHMAS ML API running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    print("Received:", data)

    try:
        vector = [float(data[f]) for f in FEATURES]
    except (KeyError, ValueError) as err:
        return jsonify({"error": f"Bad input: {err}"}), 400

    X = np.array(vector).reshape(1, -1)
    X_scaled = scaler.transform(X)
    cls = int(model.predict(X_scaled)[0])
    prob = float(model.predict_proba(X_scaled)[0][cls])

    return jsonify({
        "prediction": cls,
        "status": "Faulty" if cls else "Normal",
        "probability": round(prob, 3)
    })

if __name__ == "__main__":
    app.run(debug=True, port=8000)
