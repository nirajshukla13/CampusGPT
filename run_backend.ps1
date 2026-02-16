# Script to run backend server
Set-Location C:\Desktop\CampusGPT\backend
& "C:\Desktop\CampusGPT\venv\Scripts\python.exe" -m uvicorn server:app --reload --host 127.0.0.1 --port 8000
