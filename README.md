# CampusGPT

A comprehensive campus management system with role-based authentication and modern UI. Built with React and FastAPI, featuring student, faculty, and admin portals.

## 🚀 Features

- **Role-Based Authentication** - JWT-based secure login with three user roles (Student, Faculty, Admin)
- **User Registration** - New users can register with role selection
- **Dashboard System** - Customized dashboards for each role
- **Profile Management** - Enhanced profile pages with user statistics and activity tracking
- **Modern UI** - Built with Tailwind CSS and Radix UI components
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- React 19.0.0
- React Router DOM 7.5.1
- Tailwind CSS 3.4.17
- Radix UI Components
- Axios for API calls
- Craco for custom configuration

### Backend
- FastAPI 0.110.1
- MongoDB (Motor driver)
- JWT Authentication
- Bcrypt for password hashing
- Python 3.13.5

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **MongoDB** (running on localhost:27017)
- **Git**

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/nirajshukla13/CampusGPT.git
cd CampusGPT
```

### 2. Backend Setup

#### Create Python Virtual Environment
```bash
python -m venv venv
```

#### Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

#### Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### Configure Backend Environment
Create a `.env` file in the `backend` folder:
```env
MONGO_URI=mongodb://localhost:27017
DATABASE_NAME=test_database
JWT_SECRET=your-secret-key-here
JWT_ALGORITHM=HS256
```

### 3. Frontend Setup

#### Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

#### Configure Frontend Environment
Create a `.env` file in the `frontend` folder:
```env
REACT_APP_BACKEND_URL=http://localhost:8000
ENABLE_HEALTH_CHECK=false
```

## 🚀 Running the Application

### Start MongoDB
Ensure MongoDB is running on your system:
```bash
mongod
```

### Start Backend Server
```bash
cd backend
# Activate venv if not already activated
..\venv\Scripts\python.exe -m uvicorn server:app --reload --host 127.0.0.1 --port 8000
```

Or use the PowerShell script (Windows):
```bash
powershell -ExecutionPolicy Bypass -File run_backend.ps1
```

Backend will run on: `http://127.0.0.1:8000`

### Start Frontend Server
Open a new terminal:
```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 👤 Demo Credentials

### Student Account
- Email: `student@campus.com`
- Password: `student123`

### Faculty Account
- Email: `faculty@campus.com`
- Password: `faculty123`

### Admin Account
- Email: `admin@campus.com`
- Password: `admin123`

## 📁 Project Structure

```
CampusGPT/
├── backend/
│   ├── server.py              # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Backend configuration
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Layout.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── ui/           # Radix UI components
│   │   ├── pages/            # Page components
│   │   │   ├── Login.js
│   │   │   ├── Profile.js
│   │   │   ├── student/      # Student pages
│   │   │   ├── faculty/      # Faculty pages
│   │   │   └── admin/        # Admin pages
│   │   ├── App.js            # Main app component
│   │   └── index.js          # Entry point
│   ├── package.json          # NPM dependencies
│   └── .env                  # Frontend configuration
├── venv/                     # Python virtual environment
└── README.md                 # Project documentation
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info
- `POST /api/seed` - Seed demo users

### Student Routes
- `GET /student/dashboard` - Student dashboard
- `GET /student/history` - Query history
- `GET /student/profile` - Student profile

### Faculty Routes
- `GET /faculty/dashboard` - Faculty dashboard
- `GET /faculty/profile` - Faculty profile

### Admin Routes
- `GET /admin/dashboard` - Admin statistics
- `GET /admin/users` - List all users
- `GET /admin/profile` - Admin profile

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👥 Authors

- **Niraj Shukla** - [GitHub](https://github.com/nirajshukla13)

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.
