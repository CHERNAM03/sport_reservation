import React, { useState, useEffect } from 'react';
import './GroundsPage.css'; // Import custom CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const GroundsPage = () => {
    const [grounds, setGrounds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        // Simulate fetching grounds data from an API
        const fetchedGrounds = [
            { id: 1, name: 'Central Park Football Field', postalCode: '10001', area: 'Manhattan', description: 'A beautiful field in the heart of the city.', image: 'https://picsum.photos/200', address: '123 Park Ave, New York' },
            { id: 2, name: 'Stade de France Tennis Courts', postalCode: '93200', area: 'Saint-Denis', description: 'Professional tennis courts with excellent facilities.', image: 'https://picsum.photos/200', address: '10 Rue de la Légion d\'Honneur, Saint-Denis' },
            { id: 3, name: 'Local Arena Basketball', postalCode: '10001', area: 'Manhattan', description: 'Great place for basketball lovers.', image: 'https://picsum.photos/200', address: '456 Main St, New York' },
            { id: 4, name: 'Suburb Football Field', postalCode: '75001', area: 'Paris 1er', description: 'Quiet football field near a park.', image: '/images/ground4.jpg', address: '789 Rue de Rivoli, Paris 1er'},

            
            { id: 11, name: 'Central Park Football Field', postalCode: '10001', area: 'Manhattan', description: 'A beautiful field in the heart of the city.', image: 'https://picsum.photos/200/300', address: '123 Park Ave, New York' },
            { id: 12, name: 'Stade de France Tennis Courts', postalCode: '93200', area: 'Saint-Denis', description: 'Professional tennis courts with excellent facilities.', image: 'https://picsum.photos/200/300', address: '10 Rue de la Légion d\'Honneur, Saint-Denis' },
            { id: 13, name: 'Local Arena Basketball', postalCode: '10001', area: 'Manhattan', description: 'Great place for basketball lovers.', image: 'https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg', address: '456 Main St, New York' },
            { id: 4, name: 'Suburb Football Field', postalCode: '75001', area: 'Paris 1er', description: 'Quiet football field near a park.', image: '/images/ground4.jpg', address: '789 Rue de Rivoli, Paris 1er'},
        ];
        setGrounds(fetchedGrounds);
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value) {
            const filteredSuggestions = grounds.filter(ground =>
                ground.postalCode.toLowerCase().includes(value.toLowerCase()) ||
                ground.area.toLowerCase().includes(value.toLowerCase()) ||
                ground.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (ground) => {
        setSearchTerm(ground.postalCode); // Set search term to postal code
        setSuggestions([]); // Clear suggestions
        setGrounds(grounds.filter(g => g.postalCode === ground.postalCode)); // Filter and show grounds
    };

    const filteredGrounds = searchTerm ? grounds.filter(ground =>
        ground.postalCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ground.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ground.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : grounds;

    return (
        <div className="grounds-page">
            <div className="container">
                <div className="search-bar">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by postal code, area, or ground name"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {suggestions.length > 0 && (
                        <ul className="suggestions">
                            {suggestions.map(ground => (
                                <li key={ground.id} onClick={() => handleSuggestionClick(ground)}>
                                    {ground.name} ({ground.postalCode}, {ground.area})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="terrain-list">
                    {filteredGrounds.map((terrain) => (
                        <div key={terrain.id} className="terrain-item">
                            <img src={terrain.image} alt={terrain.name} className="terrain-image" />
                            <h3>{terrain.name}</h3>
                            <p>{terrain.description}</p>
                            <p>Adresse : {terrain.address}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GroundsPage;