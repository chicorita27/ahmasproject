import { useState } from "react";
import "./App.css";

export default function App() {
  const [form, setForm] = useState({
    brake_pressure: "",
    ambient_temperature: "",
    brake_temperature: "",
    air_leak_rate: "",
    vibration_level: "",
    brake_response_time: "",
    train_speed: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://your-backend-url.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult({ status: "Error", prediction: "N/A", probability: "N/A" });
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🚆 AHMAS Fault Predictor</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((field) => (
          <div key={field} className="input-group">
            <label>{field.replace(/_/g, " ")}</label>
            <input
              type="number"
              name={field}
              value={form[field]}
              onChange={handleChange}
              step="any"
              required
            />
          </div>
        ))}
        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {result && (
        <div className="result">
          <h2>Result</h2>
          <p>Status: <strong>{result.status}</strong></p>
          <p>Prediction: <strong>{result.prediction}</strong></p>
          <p>Probability: <strong>{result.probability}</strong></p>
        </div>
      )}
    </div>
  );
}
