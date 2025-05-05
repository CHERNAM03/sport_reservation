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
import GroundDetail from './pages/UserPanle/GroundDetail';


import SignupPage from './pages/AuthPages/SignupPage';
import PasswordForget from './pages/AuthPages/PasswordForget';
import LoginPageTasky from './pages/AuthPages/AuthPage';
import PrivateRoute from './components/PrivateRoute';

import './App.css';
import ReservationsPage from './pages/ReservationsPage.jsx';
import NewReservationPage from './pages/NewReservationPage.jsx';
import ManagerDashboard from './pages/ManagerPanel/ManagerDashboard';
import AdminPage from './pages/Admin/AdminPage.jsx';
import UserPage from './pages/UserPage.jsx';


function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
           {/*  <Route path="/admin/dashboard" element={<Dashboard />} /> */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/users" element={<Dashboard />} />
            <Route path="/admin/roles" element={<Dashboard />} />
            <Route path="/admin/bookings" element={<Dashboard />} />
            <Route path="/admin/settings" element={<Dashboard />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/reservation/new" element={<NewReservationPage />} />
            <Route path="/manager/dashboard" element={<ManagerDashboard />} />
            {/* Routes accessibles uniquement aux utilisateurs connectés */}
            <Route
                        path="/grounds"
                        element={
                            <PrivateRoute allowedRoles={['user', 'gestionnaire', 'admin']}>
                                <GroundsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/ground/:groundId"
                        element={
                            <PrivateRoute allowedRoles={['user', 'gestionnaire', 'admin']}>
                                <GroundDetail />
                            </PrivateRoute>
                        }
                    />
             {/* Routes accessibles uniquement aux gestionnaires */}
             <Route
                        path="/manager/grounds"
                        element={
                            <PrivateRoute allowedRoles={['gestionnaire', 'admin']}>
                                <GroundsPage />
                            </PrivateRoute>
                        }
                    />

                    {/* Routes accessibles uniquement aux administrateurs */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            <PrivateRoute allowedRoles={['admin']}>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    
            <Route path="/user" element={<UserPage />} />
            <Route path="/login" element={<LoginPageTasky />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<PasswordForget />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;