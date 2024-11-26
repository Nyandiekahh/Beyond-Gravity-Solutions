// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FormspreeProvider } from '@formspree/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Preloader from './components/layout/Preloader';
import AppRoutes from './routes';
import './styles/global.css';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for essential resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <FormspreeProvider>
      <BrowserRouter>
        {loading ? (
          <Preloader />
        ) : (
          <div className="app">
            <Navbar />
            <main>
              <AppRoutes />
            </main>
            <Footer />
          </div>
        )}
      </BrowserRouter>
    </FormspreeProvider>
  );
};

export default App;