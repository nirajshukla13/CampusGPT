# Script to run backend server (New Structured Version)
Set-Location C:\Desktop\CampusGPT\backend
& "C:\Desktop\CampusGPT\venv\Scripts\python.exe" -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
