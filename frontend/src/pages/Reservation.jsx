import React from 'react';
import './Reservation.css';

function Reservation() {
  return (
    <div className="reservation-container">
      <h2>Réserver un Terrain</h2>
      <form className="reservation-form">
        <label htmlFor="date">Date :</label>
        <input type="date" id="date" name="date" />

        <label htmlFor="heure">Heure :</label>
        <input type="time" id="heure" name="heure" />

        <label htmlFor="terrain">Terrain :</label>
        <select id="terrain" name="terrain">
          <option value="terrain1">Terrain 1</option>
          <option value="terrain2">Terrain 2</option>
          {/* ... autres terrains ... */}
        </select>

        <button type="submit">Réserver</button>
      </form>
    </div>
  );
}

export default Reservation;