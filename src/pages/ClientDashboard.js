import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Book, Clock, Calendar, Bell, Settings, 
  CheckCircle, AlertTriangle, Loader, BarChart, 
  Download, MessageSquare, Plus, ChevronRight
} from 'lucide-react';
import './ClientDashboard.css';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const user = {
    name: "Einstein Mokua",
    course: "Engineering",
    year: "3rd Year",
    university: "Technical University of Kenya",
    profileImage: "/api/placeholder/48/48"
  };

  const activeAssignments = [
    {
      id: 1,
      title: "Fluid Mechanics Report",
      course: "Mechanical Engineering",
      deadline: "2024-12-01",
      progress: 65,
      status: "In Progress"
    },
    {
      id: 2,
      title: "Circuit Analysis Lab",
      course: "Electrical Engineering",
      deadline: "2024-12-03",
      progress: 30,
      status: "Under Review"
    }
  ];

  const completedAssignments = [
    {
      id: 3,
      title: "Thermodynamics Project",
      course: "Mechanical Engineering",
      submittedDate: "2024-11-25",
      grade: "A",
      feedback: "Excellent work on energy analysis"
    },
    {
      id: 4,
      title: "Materials Science Report",
      course: "Engineering Materials",
      submittedDate: "2024-11-20",
      grade: "A-",
      feedback: "Good analysis, consider adding more diagrams"
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: "CAD Design Project",
      dueDate: "2024-12-05",
      priority: "High"
    },
    {
      id: 2,
      title: "Engineering Mathematics Assignment",
      dueDate: "2024-12-07",
      priority: "Medium"
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "feedback",
      message: "Feedback received on your Fluid Mechanics Report",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "deadline",
      message: "Upcoming deadline: CAD Design Project",
      time: "1 day ago"
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <img src={user.profileImage} alt="Profile" className="profile-image" />
          <div className="user-info">
            <h3>{user.name}</h3>
            <p>{user.course}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart size={20} />
            Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'assignments' ? 'active' : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            <FileText size={20} />
            Assignments
          </button>
          <button 
            className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <Book size={20} />
            Courses
          </button>
          <button 
            className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
          >
            <Calendar size={20} />
            Schedule
          </button>
          <button 
            className={`nav-item ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={20} />
            Notifications
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={20} />
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-welcome">
            <h1>Welcome back, Einstein! 👋</h1>
            <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <button className="new-assignment-btn">
            <Plus size={20} />
            New Assignment
          </button>
        </header>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Active Assignments */}
          <section className="dashboard-card assignments-card">
            <div className="card-header">
              <h2>Active Assignments</h2>
              <button className="view-all-btn">View All <ChevronRight size={16} /></button>
            </div>
            <div className="assignments-list">
              {activeAssignments.map(assignment => (
                <div key={assignment.id} className="assignment-item">
                  <div className="assignment-info">
                    <h3>{assignment.title}</h3>
                    <p>{assignment.course}</p>
                    <div className="progress-bar">
                      <div 
                        className="progress" 
                        style={{ width: `${assignment.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="assignment-status">
                    <span className={`status-badge ${assignment.status.toLowerCase().replace(' ', '-')}`}>
                      {assignment.status}
                    </span>
                    <p className="deadline">Due: {new Date(assignment.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Deadlines */}
          <section className="dashboard-card deadlines-card">
            <div className="card-header">
              <h2>Upcoming Deadlines</h2>
            </div>
            <div className="deadlines-list">
              {upcomingDeadlines.map(deadline => (
                <div key={deadline.id} className="deadline-item">
                  <div className="deadline-info">
                    <h3>{deadline.title}</h3>
                    <p>Due: {new Date(deadline.dueDate).toLocaleDateString()}</p>
                  </div>
                  <span className={`priority-badge ${deadline.priority.toLowerCase()}`}>
                    {deadline.priority}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Notifications */}
          <section className="dashboard-card notifications-card">
            <div className="card-header">
              <h2>Recent Notifications</h2>
              <button className="view-all-btn">View All <ChevronRight size={16} /></button>
            </div>
            <div className="notifications-list">
              {notifications.map(notification => (
                <div key={notification.id} className="notification-item">
                  {notification.type === 'feedback' ? (
                    <MessageSquare className="notification-icon feedback" />
                  ) : (
                    <Clock className="notification-icon deadline" />
                  )}
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span>{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Completed Assignments */}
          <section className="dashboard-card completed-card">
            <div className="card-header">
              <h2>Completed Assignments</h2>
              <button className="view-all-btn">View All <ChevronRight size={16} /></button>
            </div>
            <div className="completed-list">
              {completedAssignments.map(assignment => (
                <div key={assignment.id} className="completed-item">
                  <div className="completed-info">
                    <h3>{assignment.title}</h3>
                    <p>{assignment.course}</p>
                    <p className="submission-date">Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}</p>
                  </div>
                  <div className="grade-section">
                    <span className="grade">{assignment.grade}</span>
                    <button className="download-btn">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;