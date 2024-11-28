// src/pages/EduTaskPortal.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, Brain, Lock, Mail, Eye, EyeOff, Phone, UserCircle } from 'lucide-react';
import './EduTaskPortal.css';

const EduTaskPortal = () => {
  const [activeRole, setActiveRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formType, setFormType] = useState('login');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formType === 'register') {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  // Update the handleSubmit function in EduTaskPortal.js

const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setIsLoading(true);
  
    // Test credentials for each role
    const testCredentials = {
      client: {
        email: 'einstein.mokua@example.com',
        password: 'password123'
      },
      expert: {
        email: 'expert@edutask.com',
        password: 'expert123'
      },
      admin: {
        email: 'admin@edutask.com',
        password: 'admin123'
      }
    };
  
    setTimeout(() => {
      setIsLoading(false);
  
      if (formType === 'login') {
        // Check credentials based on active role
        const roleCredentials = testCredentials[activeRole.id];
        
        if (formData.email === roleCredentials.email && 
            formData.password === roleCredentials.password) {
          // Store auth info
          localStorage.setItem('eduTaskToken', 'sample-token');
          localStorage.setItem('eduTaskRole', activeRole.id);
          localStorage.setItem('eduTaskUser', JSON.stringify({
            name: formData.email.split('@')[0],
            role: activeRole.id
          }));
  
          // Redirect based on role
          switch (activeRole.id) {
            case 'client':
              window.location.href = '/edutask/client/dashboard';
              break;
            case 'expert':
              window.location.href = '/edutask/expert/dashboard';
              break;
            case 'admin':
              window.location.href = '/edutask/admin/dashboard';
              break;
          }
        } else {
          setErrors({
            email: 'Invalid email or password',
            password: 'Invalid email or password'
          });
        }
      } else {
        // Handle registration
        // For now, just show success message and switch to login
        alert('Registration successful! Please login.');
        setFormType('login');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
      }
    }, 1500);
  };

  const roles = [
    {
      id: 'client',
      title: 'Client',
      icon: <User className="role-icon" />,
      description: 'Get expert help with your academic tasks',
      colorClass: 'client-gradient'
    },
    {
      id: 'expert',
      title: 'Expert',
      icon: <Brain className="role-icon" />,
      description: 'Join our network of academic professionals',
      colorClass: 'expert-gradient'
    },
    {
      id: 'admin',
      title: 'Administrator',
      icon: <BookOpen className="role-icon" />,
      description: 'System management and oversight',
      colorClass: 'admin-gradient'
    }
  ];

  const renderFormFields = () => {
    if (formType === 'login') {
      return (
        <>
          <div className="form-group">
            <label>Email</label>
            <div className="input-container">
              <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-container">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
        </>
      );
    }

    return (
      <>
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <div className="input-container">
              <UserCircle className="input-icon" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className={errors.firstName ? 'error' : ''}
              />
            </div>
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <div className="input-container">
              <UserCircle className="input-icon" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className={errors.lastName ? 'error' : ''}
              />
            </div>
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <div className="input-container">
            <Mail className="input-icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
            />
          </div>
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <div className="input-container">
            <Phone className="input-icon" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className={errors.phone ? 'error' : ''}
            />
          </div>
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-container">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create password"
              className={errors.password ? 'error' : ''}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-container">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
              className={errors.confirmPassword ? 'error' : ''}
            />
          </div>
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
      </>
    );
  };

  return (
    <div className="portal-container">
      <div className="portal-content">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="portal-header"
        >
          <h1 className="portal-title">Welcome to EduTask Portal</h1>
          <p className="portal-subtitle">
            Choose your role to {formType === 'login' ? 'sign in' : 'create an account'}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!activeRole ? (
            <motion.div
              key="roles"
              className="roles-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {roles.map((role, index) => (
                <motion.div
                  key={role.id}
                  className={`role-card ${role.colorClass}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  onClick={() => setActiveRole(role)}
                >
                  <div className={`role-icon-container ${role.colorClass}`}>
                    {role.icon}
                  </div>
                  <h3 className="role-title">{role.title}</h3>
                  <p className="role-description">{role.description}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="form-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="auth-form">
                <div className="form-header">
                  <div className={`form-icon-container ${activeRole.colorClass}`}>
                    {activeRole.icon}
                  </div>
                  <h2 className="form-title">
                    {activeRole.title} {formType === 'login' ? 'Login' : 'Registration'}
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                  {renderFormFields()}

                  <button
                    className={`submit-button ${activeRole.colorClass} ${isLoading ? 'loading' : ''}`}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loader"></div>
                    ) : (
                      formType === 'login' ? 'Sign In' : 'Create Account'
                    )}
                  </button>
                </form>

                <div className="form-footer">
                  <button
                    onClick={() => {
                      setFormType(formType === 'login' ? 'register' : 'login');
                      setErrors({});
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        password: '',
                        confirmPassword: ''
                      });
                    }}
                    className="toggle-form-button"
                  >
                    {formType === 'login' 
                      ? "Don't have an account? Sign up" 
                      : "Already have an account? Sign in"}
                  </button>

                  <button
                    onClick={() => {
                      setActiveRole(null);
                      setErrors({});
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        password: '',
                        confirmPassword: ''
                      });
                    }}
                    className="back-button"
                  >
                    ← Choose different role
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EduTaskPortal;