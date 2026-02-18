# CampusGPT 🎓

A smart campus management system that helps students, faculty, and administrators connect and manage campus activities easily.

**Developed by Team CodeBuilders** 💻

---

## What is CampusGPT?

CampusGPT is a web application designed to make campus life easier for everyone. Students can chat with an AI assistant, view events, and access learning resources. Faculty members can upload materials and track student progress. Administrators can manage users and monitor the entire system.

---

## Features

### For Students 👨‍🎓
- **AI Chat Assistant** - Get instant answers to your campus-related questions
- **Event Calendar** - Stay updated with upcoming campus events
- **Resource Library** - Access study materials and documents
- **Query History** - Review your past conversations with the assistant
- **Personal Dashboard** - See your activity overview

### For Faculty 👩‍🏫
- **Upload Resources** - Share study materials with students
- **View Insights** - Track how students are using the resources
- **Manage Content** - Organize and update learning materials
- **Faculty Dashboard** - Monitor your teaching activities

### For Administrators 🔧
- **User Management** - Add, edit, or remove users from the system
- **System Monitoring** - Keep track of platform usage and performance
- **Dashboard Analytics** - View statistics about students, faculty, and resources
- **Access Control** - Manage who can access what features

---

## Technology Stack

### Frontend (What you see)
- **React** - For building the user interface
- **Vite** - Fast development and building
- **Tailwind CSS** - For styling and design
- **Radix UI** - Pre-built accessible components
- **React Router** - For page navigation
- **Axios** - To communicate with the backend

### Backend (Behind the scenes)
- **FastAPI** - Python framework for building APIs
- **MongoDB** - Database to store all information
- **JWT** - For secure user login and authentication
- **Bcrypt** - To keep passwords safe
- **Motor** - Async database operations

---

## Getting Started

### Prerequisites
Before you start, make sure you have these installed:
- **Python 3.8+** - For running the backend
- **Node.js 16+** - For running the frontend
- **MongoDB** - Database (can be local or cloud)
- **Git** - For version control

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd CampusGPT
```

#### 2. Setup Backend

Navigate to the backend folder:
```bash
cd backend
```

Create a virtual environment:
```bash
python -m venv venv
```

Activate the virtual environment:
- **Windows**: `venv\Scripts\activate`
- **Mac/Linux**: `source venv/bin/activate`

Install required packages:
```bash
pip install -r requirements.txt
```

Create a `.env` file in the backend folder:
```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=campusgpt
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Start the backend server:
```bash
python -m uvicorn main:app --reload --port 8000
```

The API will be available at: `http://localhost:8000`

#### 3. Setup Frontend

Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the frontend folder:
```env
VITE_API_URL=http://localhost:8000/api
```

Start the development server:
```bash
npm run dev
```

The application will open at: `http://localhost:3000`

---

## Quick Start with PowerShell (Windows)

We've included a convenient script to start the backend:

```powershell
.\run_backend_structured.ps1
```

This will automatically activate the virtual environment and start the server.

---

## Project Structure

```
CampusGPT/
├── backend/                 # Backend API
│   ├── routes/             # API endpoints
│   │   ├── auth.py         # Login and registration
│   │   ├── student.py      # Student features
│   │   ├── faculty.py      # Faculty features
│   │   ├── admin.py        # Admin features
│   │   └── seed.py         # Create demo users
│   ├── schemas/            # Data models
│   │   └── user.py         # User data structure
│   ├── utils/              # Helper functions
│   │   └── auth.py         # Authentication utilities
│   ├── config.py           # App configuration
│   ├── database.py         # Database connection
│   ├── main.py             # Application entry point
│   └── requirements.txt    # Python packages
│
├── frontend/               # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Different pages
│   │   │   ├── admin/      # Admin pages
│   │   │   ├── faculty/    # Faculty pages
│   │   │   └── student/    # Student pages
│   │   ├── lib/            # Utility functions
│   │   └── main.jsx        # App entry point
│   ├── package.json        # Node packages
│   └── vite.config.js      # Vite configuration
│
└── README.md               # This file
```

---

## User Roles

The system has three types of users:

1. **Student** - Can access learning resources, chat with AI, and view events
2. **Faculty** - Can upload materials, view insights, and manage content
3. **Admin** - Full access to manage users and monitor the system

---

## API Documentation

Once the backend is running, you can view the interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

These pages let you test API endpoints directly from your browser.

---

## Default Demo Users

You can create demo users by calling the seed endpoint:

**POST** `http://localhost:8000/api/seed`

This creates three demo accounts:
- **Student**: `student@campus.com` / Password: `student123`
- **Faculty**: `faculty@campus.com` / Password: `faculty123`
- **Admin**: `admin@campus.com` / Password: `admin123`

---

## Key Features Explained

### Authentication & Security
- Passwords are encrypted before storing (using bcrypt)
- JWT tokens are used for secure sessions
- Each user type has specific access permissions
- Logged-in users stay signed in until token expires

### Role-Based Access Control
- Students can't access faculty or admin features
- Faculty can't access admin features
- Each role sees only what they're supposed to see

### Modern Design
- Dark mode for comfortable viewing
- Responsive design works on phone, tablet, and desktop
- Clean and intuitive interface
- Smooth animations and transitions

---

## Development

### Backend Development
The backend is organized into modules:
- **routes/** - Define what each API endpoint does
- **schemas/** - Define the structure of data
- **utils/** - Reusable functions (like password checking)
- **config.py** - All settings in one place
- **database.py** - Database connection management

### Frontend Development
The frontend uses modern React practices:
- Components are reusable pieces of UI
- Pages combine components to create full screens
- Routing handles navigation between pages
- State management keeps track of user data

---

## Common Issues & Solutions

### Backend won't start?
- Make sure MongoDB is running
- Check if port 8000 is not already in use
- Verify your `.env` file has correct settings
- Make sure virtual environment is activated

### Frontend won't start?
- Delete `node_modules` folder and run `npm install` again
- Check if port 3000 is available
- Make sure `.env` file exists with correct API URL

### Can't login?
- Check if backend is running
- Verify the API URL in frontend `.env` matches backend address
- Try creating demo users using the seed endpoint

---

## Contributing

This project is maintained by **Team CodeBuilders**. 

To contribute:
1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request with a clear description

---

## Support

If you encounter any issues or have questions:
- Check the API documentation at `/docs`
- Review the browser console for error messages
- Check backend logs for API errors
- Ensure all environment variables are set correctly

---

## License

This project is created by Team CodeBuilders for educational and campus management purposes.

---

## Team CodeBuilders

Built with ❤️ by Team CodeBuilders

**Making campus life smarter, one feature at a time!**

---

## Version History

- **v1.0.0** - Initial release with core features
  - User authentication (Login/Register)
  - Role-based dashboards (Student, Faculty, Admin)
  - AI Chat Assistant
  - Event management
  - Resource library
  - User management

---

**Happy Coding! 🚀**
