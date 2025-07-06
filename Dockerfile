# Use Python 3.11 base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies for Node.js and build tools
RUN apt-get update && apt-get install -y curl build-essential

# Install Node.js 20.x and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt-get install -y nodejs

# Copy backend files first (for pip install caching)
COPY ./backend /app/backend

# Upgrade pip and install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r backend/requirements.txt

# Copy frontend files
COPY ./ahmas-frontend-vite /app/ahmas-frontend-vite

# Install frontend dependencies and build React frontend
RUN cd ahmas-frontend-vite && npm install && npm run build

# Expose port your Flask app will run on
EXPOSE 8000

# Run Flask app with gunicorn
CMD ["gunicorn", "backend.app:app", "--bind", "0.0.0.0:8000"]
