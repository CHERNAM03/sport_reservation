import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';
import { Plus, Calendar, Edit, Trash2 } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'bootstrap/js/dist/modal';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Bookings = () => {
    const [bookings, setBookings] = useState([
        // Simulated booking data
        { id: 1, sport: 'Tennis', date: '2023-11-15', time: '10:00', user: 'Alice', status: 'Confirmed' },
        { id: 2, sport: 'Football', date: '2023-11-16', time: '14:00', user: 'Bob', status: 'Pending' },
        { id: 3, sport: 'Basketball', date: '2023-11-17', time: '16:00', user: 'Charlie', status: 'Confirmed' },
    ]);
    const [modalInstance, setModalInstance] = useState(null);
  
    useEffect(() => {
        // Initialize modal instance
        const modal = new Modal(document.getElementById('addBookingModal'));
        setModalInstance(modal);
    }, []);

    const openModal = () => {
        if (modalInstance) {
            modalInstance.show();
        }
    };
    const handleBookingAdded = (newBooking) => {
        setBookings([...bookings, newBooking]);
        if (modalInstance) {
            modalInstance.hide();
        }
    };

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Bookings</h1>
                <button className="btn btn-primary" onClick={() => {/* Open Booking Creation Modal */
                    openModal();
                }}>
                    <Plus className="me-2" /> New Booking
                </button>
            </div>

            {/* Filtering and Search */}
            <div className="mb-4">
                {/* Add filter and search inputs here */}
            </div>

            {/* Booking List/Table */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Sport</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>User</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.sport}</td>
                            <td>{booking.date}</td>
                            <td>{booking.time}</td>
                            <td>{booking.user}</td>
                            <td>
                                <span className={`badge ${booking.status === 'Confirmed' ? 'bg-success' : booking.status === 'Pending' ? 'bg-warning' : 'bg-danger'}`}>
                                    {booking.status}
                                </span>
                            </td>
                            <td>
                                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => {/* View Booking Details */}}>
                                    <Calendar size={16} />
                                </button>
                                <button className="btn btn-outline-warning btn-sm me-2" onClick={() => {/* Edit Booking */}}>
                                    <Edit size={16} />
                                </button>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => {/* Cancel Booking */}}>
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {  /* Add Booking Modal */  }
                <div className="modal fade" id="addBookingModal" tabIndex="-1" aria-labelledby="addBookingModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addBookingModalLabel">Add New Booking</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <BookingForm onBookingAdded={handleBookingAdded} />
                            </div>
                        </div>
                    </div>
                </div>
            {/* Booking Details Modal */}
            {/* ... */}
        </div>
    );
};

export default Bookings;