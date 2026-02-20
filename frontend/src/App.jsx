import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import StudentDashboard from './pages/student/Dashboard.jsx';
import StudentChat from './pages/student/Chat.jsx';
import StudentHistory from './pages/student/History.jsx';
import StudentEvents from './pages/student/Events.jsx';
import StudentResources from './pages/student/Resources.jsx';
import Architecture from './pages/student/Architecture.jsx';
import Workflow from './pages/student/Workflow.jsx';
import FacultyDashboard from './pages/faculty/Dashboard.jsx';
import FacultyUpload from './pages/faculty/Upload.jsx';
import FacultyInsights from './pages/faculty/Insights.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';
import AdminUsers from './pages/admin/Users.jsx';
import AdminMonitor from './pages/admin/Monitor.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/student/dashboard" replace />} />
        <Route path="/login" element={<Login />} />

        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/chat" element={<StudentChat />} />
        <Route path="/student/history" element={<StudentHistory />} />
        <Route path="/student/events" element={<StudentEvents />} />
        <Route path="/student/resources" element={<StudentResources />} />
        <Route path="/student/architecture" element={<Architecture />} />
        <Route path="/student/workflow" element={<Workflow />} />
        <Route path="/student/profile" element={<Profile />} />

        <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/faculty/upload" element={<FacultyUpload />} />
        <Route path="/faculty/insights" element={<FacultyInsights />} />
        <Route path="/faculty/profile" element={<Profile />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/monitor" element={<AdminMonitor />} />
        <Route path="/admin/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;