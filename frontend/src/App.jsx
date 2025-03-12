
// filepath: /Users/cheikhthiam/Desktop/Greeta/node/projPersonnelle/Ameer/sport_reservation/frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Reservation from './pages/Reservation';
import Terrain from './pages/Terrain';
import Contact from './pages/Contact';
import Connexion from './pages/Connexion';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/terrain" element={<Terrain />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<Connexion />} />
          {/* Ajoutez d'autres routes ici */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
