import { useState } from "react";
import "./App.css";
import ChartDisplay from "./ChartDisplay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://192.164.1.57:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setResult(data);
      toast.success("Prediction successful!");
    } catch (error) {
      console.error("Error:", error);
      setResult({ status: "Error", prediction: "N/A", probability: "N/A" });
      toast.error("Failed to fetch prediction");
    }

    setLoading(false);
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <header className="header">
        <h1>🚆 AHMAS Fault Predictor</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <main className="main-content full-screen">
        <div className="grid-layout">
          <div className="form-section">
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
          </div>

          <div className="results-section">
            {result && (
              <div className="result">
                <h2>Prediction Result</h2>
                <p>Status: <strong>{result.status}</strong></p>
                <p>Prediction: <strong>{result.prediction}</strong></p>
                <p>Probability: <strong>{result.probability}</strong></p>
              </div>
            )}

            <ChartDisplay formData={form} result={result} />
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2025 AHMAS Project | All rights reserved.</p>
      </footer>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}