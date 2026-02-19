# ----------------------------
# Base image
# ----------------------------
FROM python:3.10-slim

# ----------------------------
# Environment settings
# ----------------------------
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ----------------------------
# System dependencies
# ----------------------------
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    poppler-utils \
    tesseract-ocr \
    libmagic1 \
    && rm -rf /var/lib/apt/lists/*

# ----------------------------
# Set working directory
# ----------------------------
WORKDIR /app

# ----------------------------
# Install Python dependencies (cached layer)
# ----------------------------
COPY requirements.prod.txt .

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.prod.txt

# ----------------------------
# Copy application code (changes here won't bust deps cache)
# ----------------------------
COPY . .

# ----------------------------
# Expose port
# ----------------------------
EXPOSE 8000

# ----------------------------
# Start FastAPI server
# ----------------------------
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
