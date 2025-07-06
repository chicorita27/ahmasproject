from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})


try:
    model = joblib.load("random_forest_airbrake.pkl")
    scaler = joblib.load("airbrake_scaler.pkl")
    print("✅ Model and scaler loaded")
except Exception as e:
    print("❌ Model load failed:", repr(e))
    raise  # show full traceback if loading fails

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

    try:
        X_scaled = scaler.transform(X)
        cls = int(model.predict(X_scaled)[0])
        proba_arr = model.predict_proba(X_scaled)[0]

        print("Model classes:", model.classes_)
        print("Predicted class:", cls)
        print("Prediction probabilities:", proba_arr)

        # Find index of predicted class in model.classes_
        if cls in model.classes_:
            class_index = list(model.classes_).index(cls)
            prob = float(proba_arr[class_index])
        else:
            return jsonify({"error": "Predicted class not in model classes"}), 500

        status = "Faulty" if cls else "Normal"

    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

    return jsonify({
        "prediction": cls,
        "status": status,
        "probability": round(prob, 3)
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port, debug=True)
