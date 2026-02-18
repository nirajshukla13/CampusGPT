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
import ProtectedRoute from './components/ProtectedRoute.jsx';
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
        <Route path="/student/events" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentEvents />
          </ProtectedRoute>
        } />
        <Route path="/student/resources" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentResources />
          </ProtectedRoute>
        } />
        <Route path="/student/architecture" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Architecture />
          </ProtectedRoute>
        } />
        <Route path="/student/workflow" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Workflow />
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