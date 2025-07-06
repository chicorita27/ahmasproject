# Use Python 3.11 base image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy backend files
COPY ./backend /app/backend

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r backend/requirements.txt

# Copy frontend files
COPY ./ahmas-frontend-vite /app/ahmas-frontend-vite

# Install frontend dependencies and build frontend
RUN apt-get update && apt-get install -y nodejs npm
RUN cd ahmas-frontend-vite && npm install && npm run build

# Expose port your Flask app will run on
EXPOSE 8000

# Command to run Flask app (adjust path if needed)
CMD ["python", "backend/app.py"]
