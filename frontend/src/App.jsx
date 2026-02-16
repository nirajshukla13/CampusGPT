import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import StudentDashboard from './pages/student/Dashboard';
import StudentChat from './pages/student/Chat';
import StudentHistory from './pages/student/History';
import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyUpload from './pages/faculty/Upload';
import FacultyInsights from './pages/faculty/Insights';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminMonitor from './pages/admin/Monitor';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/student/chat" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentChat />
          </ProtectedRoute>
        } />
        <Route path="/student/history" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentHistory />
          </ProtectedRoute>
        } />
        <Route path="/student/profile" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* Faculty Routes */}
        <Route path="/faculty/dashboard" element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <FacultyDashboard />
          </ProtectedRoute>
        } />
        <Route path="/faculty/upload" element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <FacultyUpload />
          </ProtectedRoute>
        } />
        <Route path="/faculty/insights" element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <FacultyInsights />
          </ProtectedRoute>
        } />
        <Route path="/faculty/profile" element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        } />
        <Route path="/admin/monitor" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminMonitor />
          </ProtectedRoute>
        } />
        <Route path="/admin/profile" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;