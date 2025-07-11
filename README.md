# AHMAS – Air Brake Health Monitoring & Alert System

A predictive health monitoring platform for railway air brake systems using Machine Learning. Built with a Flask backend and a React frontend, AHMAS detects potential brake failures and provides real-time alerts, visualization, and component-specific insights.

---

## ⚙️ Project Objective

To enhance railway safety by building an intelligent system that:
- Predicts air brake failures using sensor data
- Alerts users about component-level faults
- Offers visual graphs and analysis dashboards
- Supports a smooth UI with dark/light mode

---

## 🚀 Features

- Visual prediction results (charts, plots)
- Real-time alert system for abnormal brake conditions
- ML model integration (Random Forest)
- Dark/Light mode toggle
- Frontend–Backend integration using Flask API and CORS
- Simple, clean UI built with React and Vite

---

## 🧠 Tech Stack

### Frontend:
- React.js
- Vite
- Tailwind CSS
- Axios

### Backend:
- Python (Flask)
- joblib, NumPy, scikit-learn
- Flask-CORS

### Machine Learning:
- Random Forest Classifier trained on air brake health data
- Scaler + preprocessing pipeline saved via joblib

---

## 🛠️ Setup & Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/chicorita27/ahmasproject.git
cd ahmasproject
# 1️⃣ Clone the Repository
git clone https://github.com/chicorita27/ahmasproject.git
cd ahmasproject

# 2️⃣ Setup & Run Backend (Flask)
cd backend
pip install -r requirements.txt   # Install Python dependencies

# Make sure model files are in backend/ directory (e.g., random_forest_airbrake.pkl, scaler)
python app.py                     # Start Flask server

# OPTIONAL (if running Flask on a different port)
# python app.py --port=5001

# 3️⃣ Open a new terminal window/tab and run Frontend (React)
cd ../frontend
npm install                       # Install React dependencies
npm run dev                       # Start React development server

