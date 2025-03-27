import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingForm = ({ onBookingAdded }) => {
    const [newBooking, setNewBooking] = useState({
        sport: '',
        date: '',
        time: '',
        user: '',
        ground: '',
        notes: '',
    });

    const [sports, setSports] = useState(['Tennis', 'Football', 'Basketball']); // Simulated sports
    const [users, setUsers] = useState(['Alice', 'Bob', 'Charlie']); // Simulated users
    const [grounds, setGrounds] = useState(['Central Park', 'Stade de France', 'Local Arena']); // Simulated grounds

    const handleInputChange = (e) => {
        setNewBooking({ ...newBooking, [e.target.name]: e.target.value });
    };

    const handleAddBooking = () => {
        // Validation (add more robust validation as needed)
        if (!newBooking.sport || !newBooking.date || !newBooking.time || !newBooking.user || !newBooking.ground) {
            alert('Please fill in all required fields.');
            return;
        }

        // Simulate adding booking (replace with your API call)
        const bookingToAdd = { id: Date.now(), ...newBooking, status: 'Pending' };

        // Call the onBookingAdded function to update the parent component's state
        onBookingAdded(bookingToAdd);

        // Reset the form
        setNewBooking({ sport: '', date: '', time: '', user: '', ground: '', notes: '' });
    };

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Add Booking</h1>
            </div>

            <div className="card p-3">
                <div className="mb-3">
                    <label className="form-label">Sport</label>
                    <select className="form-select" name="sport" value={newBooking.sport} onChange={handleInputChange}>
                        <option value="">Select Sport</option>
                        {sports.map(sport => (
                            <option key={sport} value={sport}>{sport}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" name="date" value={newBooking.date} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Time</label>
                    <input type="time" className="form-control" name="time" value={newBooking.time} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">User</label>
                    <select className="form-select" name="user" value={newBooking.user} onChange={handleInputChange}>
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Ground</label>
                    <select className="form-select" name="ground" value={newBooking.ground} onChange={handleInputChange}>
                        <option value="">Select Ground</option>
                        {grounds.map(ground => (
                            <option key={ground} value={ground}>{ground}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Notes</label>
                    <textarea className="form-control" name="notes" value={newBooking.notes} onChange={handleInputChange}></textarea>
                </div>

                <button className="btn btn-primary" onClick={handleAddBooking}>Add Booking</button>
            </div>
        </div>
    );
};

export default BookingForm;