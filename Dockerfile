# Use Python 3.11 base image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Debug: print Python and pip versions
RUN python --version
RUN pip --version

# Copy backend files
COPY ./backend /app/backend

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r backend/requirements.txt

# Copy frontend files
COPY ./ahmas-frontend-vite /app/ahmas-frontend-vite

# Install curl, Node.js (latest LTS), and npm
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

# Install frontend dependencies and build frontend
RUN cd ahmas-frontend-vite && npm install && npm run build

# Expose port your Flask app will run on
EXPOSE 8000

# Command to run Flask app (adjust path if needed)
CMD ["python", "backend/app.py"]
