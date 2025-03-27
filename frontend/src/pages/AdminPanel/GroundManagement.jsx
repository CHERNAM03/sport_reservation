import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GroundManagement = () => {
    const [grounds, setGrounds] = useState([
        // Simulated ground data
        { id: 1, name: 'Central Park Football Field', postalCode: '10001', country: 'USA', province: 'NY', city: 'New York', address: 'Central Park West' },
        { id: 2, name: 'Stade de France Tennis Courts', postalCode: '93200', country: 'France', province: 'Île-de-France', city: 'Saint-Denis', address: 'Rue Jules Rimet' },
    ]);
    const [newGround, setNewGround] = useState({
        name: '',
        postalCode: '',
        country: '',
        province: '',
        city: '',
        address: '',
    });

    const handleInputChange = (e) => {
        setNewGround({ ...newGround, [e.target.name]: e.target.value });
    };

    const handlePostalCodeLookup = async () => {
        try {
            const response = await fetch(`YOUR_POSTAL_CODE_API_ENDPOINT?postalcode=${newGround.postalCode}`);
            const data = await response.json();

            // Extract data from the API response and update the newGround state
            setNewGround({
                ...newGround,
                country: data.country,
                province: data.province,
                city: data.city,
                address: data.address,
            });
        } catch (error) {
            console.error('Error looking up postal code:', error);
        }
    };

    const addGround = () => {
        setGrounds([...grounds, { id: Date.now(), ...newGround }]);
        setNewGround({ name: '', postalCode: '', country: '', province: '', city: '', address: '' });
    };

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Ground Management</h1>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addGroundModal">
                    <Plus className="me-2" /> Add Ground
                </button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Ground Name</th>
                        <th>Postal Code</th>
                        <th>Country</th>
                        <th>Province</th>
                        <th>City</th>
                        <th>Exact Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {grounds.map(ground => (
                        <tr key={ground.id}>
                            <td>{ground.name}</td>
                            <td>{ground.postalCode}</td>
                            <td>{ground.country}</td>
                            <td>{ground.province}</td>
                            <td>{ground.city}</td>
                            <td>{ground.address}</td>
                            <td>
                                <button className="btn btn-outline-warning btn-sm me-2">
                                    <Edit size={16} />
                                </button>
                                <button className="btn btn-outline-danger btn-sm">
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Ground Modal */}
            <div className="modal fade" id="addGroundModal" tabIndex="-1" aria-labelledby="addGroundModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addGroundModalLabel">Add New Ground</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control mb-2" placeholder="Ground Name" name="name" value={newGround.name} onChange={handleInputChange} />
                            <input type="text" className="form-control mb-2" placeholder="Postal Code" name="postalCode" value={newGround.postalCode} onChange={handleInputChange} />
                            <button className="btn btn-secondary mb-2" onClick={handlePostalCodeLookup}>Lookup Postal Code</button>
                            <input type="text" className="form-control mb-2" placeholder="Country" name="country" value={newGround.country} onChange={handleInputChange} />
                            <input type="text" className="form-control mb-2" placeholder="Province/Department/State" name="province" value={newGround.province} onChange={handleInputChange} />
                            <input type="text" className="form-control mb-2" placeholder="City" name="city" value={newGround.city} onChange={handleInputChange} />
                            <input type="text" className="form-control mb-2" placeholder="Exact Address" name="address" value={newGround.address} onChange={handleInputChange} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={addGround} data-bs-dismiss="modal">Add Ground</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroundManagement;