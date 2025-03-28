import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Dashboard from './pages/AdminPanel/Admin';
import LandingPage from './pages/UserPanle/LandingPage';
import GroundsPage from './pages/UserPanle/GroundsPage';
import AuthP from './pages/AuthPage';
import SignupPage from './pages/SignupPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Dashboard />} />
            <Route path="/admin/roles" element={<Dashboard />} />
            <Route path="/admin/bookings" element={<Dashboard />} />
            <Route path="/admin/settings" element={<Dashboard />} />
            <Route path="/grounds" element={<GroundsPage />} />
            <Route path="/login" element={<AuthP />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;