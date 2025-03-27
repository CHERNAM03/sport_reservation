import React, { useState } from 'react';
import './Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Bookings from './Booking/Bookings';
import GroundManagement from './GroundManagement';
import UserForm from './Users/UserForm';
import UserManagement  from './Users/UserManagement';
import FacilityPage from './Users/FacilityPage';



import {
  Home,
  Users,
  Shield,
  Calendar,
  Settings,
  Search,
  User,
  UserPlus,
  LogOut,
} from 'lucide-react';


const Dashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Simulated data
  const statsData = [
    {
      title: 'Total Bookings',
      value: 156,
      color: 'bg-primary',
      icon: <Calendar className="text-white" />,
    },
    {
      title: 'Total Revenue',
      value: '$4,500',
      color: 'bg-success',
      icon: <Users className="text-white" />,
    },
    {
      title: 'Active Users',
      value: 42,
      color: 'bg-warning',
      icon: <User className="text-white" />,
    },
  ];

  const menuItems = [
    {
      icon: <Home />,
      label: 'Dashboard',
      page: 'dashboard',
    },
    {
      icon: <Users />,
      label: 'User Management',
      page: 'users',
    },
    {
      icon: <Shield />,
      label: 'Roles & Permissions',
      page: 'roles',
    },
    {
      icon: <Calendar />,
      label: 'Bookings',
      page: 'bookings',
    },
    {
        icon: <Settings />,
        label: 'grounds',
        page: 'grounds',
      },
    {
      icon: <Settings />,
      label: 'Settings',
      page: 'settings',
    },
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <div className="p-4">
            <h1 className="mb-4">Dashboard Overview</h1>
            <div className="row g-3">
              {statsData.map((stat, index) => (
                <div key={index} className="col-md-4">
                  <div className={`card ${stat.color} text-white`}>
                    <div className="card-body d-flex align-items-center">
                      <div className="me-3">{stat.icon}</div>
                      <div>
                        <h5 className="card-title">{stat.title}</h5>
                        <p className="card-text display-6">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity Section */}
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Recent Bookings</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Football Ground
                      <span className="badge bg-primary rounded-pill">Booked</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Tennis Court
                      <span className="badge bg-warning rounded-pill">Pending</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Basketball Arena
                      <span className="badge bg-success rounded-pill">Confirmed</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">Quick Actions</h5>
                  </div>
                  <div className="card-body">
                    <button className="btn btn-primary me-2 mb-2">
                      <UserPlus className="me-2" /> Add User
                    </button>
                    <button className="btn btn-success me-2 mb-2">
                      <Calendar className="me-2" /> New Booking
                    </button>
                    <button className="btn btn-info mb-2">
                      <Settings className="me-2" /> Manage Grounds
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'users':
          return <UserManagement  />;
      case 'roles':
        return (
          <div className="p-4">
            <h1>Roles & Permissions</h1>
          </div>
        );
      case 'bookings':
            return <Bookings />;
       case 'grounds':
            return <GroundManagement />;
       case 'settings': 
        return (
          <div className="p-4">
            <h1>Settings</h1>
            <FacilityPage />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-2 bg-dark text-white sidebar"
          style={{
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            paddingTop: '20px',
          }}
        >
          <div className="d-flex justify-content-between align-items-center px-3 mb-4">
            <h4 className="mb-0">Sports Hub</h4>
            <button
              className="btn btn-outline-light"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Settings />
            </button>
          </div>

          <nav className="nav flex-column">
            {menuItems.map((item) => (
              <button
                key={item.page}
                className={`nav-link text-start ${
                  activePage === item.page
                    ? 'bg-primary text-white'
                    : 'text-light'
                }`}
                onClick={() => setActivePage(item.page)}
              >
                {item.icon}
                <span className="ms-2">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div
          className="col-md-10 offset-md-2"
          style={{
            backgroundColor: '#f4f6f9',
            minHeight: '100vh',
          }}
        >
          {/* Top Navbar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container-fluid">
              {/* Search Bar */}
              <form className="d-flex flex-grow-1 me-3">
                <div className="input-group">
                  <span className="input-group-text">
                    <Search />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search users by name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>

              {/* User Profile */}
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <img
                    src="/api/placeholder/40/40"
                    alt="User"
                    className="rounded-circle me-2"
                    style={{ width: '40px', height: '40px' }}
                  />
                  <span className="fw-bold">John Doe</span>
                </div>
                <button className="btn btn-outline-danger">
                  <LogOut className="me-1" /> Logout
                </button>
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <main>{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;