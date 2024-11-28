// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import EduTask from './pages/EduTask';
import EduTaskPortal from './pages/EduTaskPortal';
import ClientDashboard from './pages/ClientDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* EduTask Public Routes */}
      <Route path="/edutask" element={<EduTask />} />
      <Route path="/edutask/portal" element={<EduTaskPortal />} />
      
      {/* EduTask Protected Routes */}
      <Route path="/edutask/client/*" element={
        <ProtectedRoute>
          <Routes>
            <Route path="/" element={<ClientDashboard />} />
            <Route path="/dashboard" element={<ClientDashboard />} />
            <Route path="/assignments" element={<ClientDashboard />} />
            <Route path="/courses" element={<ClientDashboard />} />
            <Route path="/schedule" element={<ClientDashboard />} />
            <Route path="/notifications" element={<ClientDashboard />} />
            <Route path="/settings" element={<ClientDashboard />} />
          </Routes>
        </ProtectedRoute>
      } />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;