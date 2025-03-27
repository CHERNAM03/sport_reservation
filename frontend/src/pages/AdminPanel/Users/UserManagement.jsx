import React from 'react'
import { UserPlus, User, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import UserForm from './UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


 const UserManagement  = () => {

  const [users, setUsers] = useState([
    // Données utilisateur simulées
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Inactive' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User', status: 'Active' },
]);

const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]);
};
    return (
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>User Management</h1>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">
                    <UserPlus className="me-2" /> Ajouter un Utilisateur
            </button>
          </div>
          <div className="card shadow-sm">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.role === 'Admin'
                            ? 'bg-danger'
                            : user.role === 'Manager'
                            ? 'bg-warning'
                            : 'bg-success'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          user.status === 'Active' ? 'bg-success' : 'bg-danger'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex space-x-2">
                        <button className="btn btn-outline-primary btn-sm">
                          <User size={16} />
                        </button>
                        <button className="btn btn-outline-warning btn-sm">
                          <Settings size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            {/* Modal pour le formulaire d'ajout d'utilisateur */}
            <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addUserModalLabel">Ajouter un Nouvel Utilisateur</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <UserForm onUserAdded={handleUserAdded} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
};
export default UserManagement;
