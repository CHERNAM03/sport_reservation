
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Reservation from './pages/Reservation';
import Terrain from './pages/Terrain';
import Contact from './pages/Contact';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import AdminDashboard from './pages/AdminDashboard';
import AdminTerrains from './adminterrains/AdminTerrains';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={<HeroSection />} />
            
            <Route path="/terrain" element={<Terrain />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
          path="/reservation"
          element={
            <PrivateRoute roles={['admin']}>
              <Reservation />
            </PrivateRoute>
          }
        />
            <Route path="/admin/terrains" element={<AdminTerrains />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;