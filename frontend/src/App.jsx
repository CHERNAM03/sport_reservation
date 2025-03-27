
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import Dashboard from './pages/AdminPanel/Admin';
import LandingPage from './pages/UserPanle/LandingPage';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
           <Route path="/hero" element={<HeroSection />} />
            <Route path="/" element={<LandingPage />} />
            
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Dashboard />} />
            <Route path="/admin/roles" element={<Dashboard />} />
            <Route path="/admin/bookings" element={<Dashboard />} />
            <Route path="/admin/settings" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;