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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">AHMAS Fault Predictor</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="row">
          {Object.keys(form).map((key) => (
            <div className="col-md-6 mb-3" key={key}>
              <label className="form-label text-capitalize">
                {key.replace(/_/g, " ")}:
              </label>
              <input
                type="number"
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="form-control"
                step="any"
                required
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {result && (
        <div className="card mt-4 p-4 bg-light border-success">
          <h4 className="text-success">Result</h4>
          <p>
            <strong>Status:</strong> {result.status}
          </p>
          <p>
            <strong>Prediction:</strong> {result.prediction}
          </p>
          <p>
            <strong>Probability:</strong> {result.probability}
          </p>
        </div>
      )}
    </div>
  );
}
