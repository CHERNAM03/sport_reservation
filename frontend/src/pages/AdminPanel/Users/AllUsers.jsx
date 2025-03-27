import React from 'react'
import { UserPlus, User, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


// Simulated user data
const initialUsers = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    role: 'Admin',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    role: 'Manager',
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'Mike Johnson', 
    email: 'mike.johnson@example.com', 
    role: 'User',
    status: 'Inactive'
  }
];

 const AllUsers = () => {

  const [users, setUsers] = useState(initialUsers);

    return (
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>User Management</h1>
            <button className="btn btn-primary">
              <UserPlus className="me-2" /> Add User
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
        </div>
      );
};
export default AllUsers;
