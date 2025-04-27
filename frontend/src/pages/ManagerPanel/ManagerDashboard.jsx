import React, { useState, useEffect, useMemo, useCallback } from 'react';
import api from '../../api/api';
import io from 'socket.io-client';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './ManagerDashboard.css';

const SOCKET_SERVER_URL = 'http://localhost:5000';

// Fonction pour limiter les appels fréquents (debounce)
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Hook personnalisé pour gérer la connexion socket
const useSocket = (url, onStatsUpdate) => {
    const [isConnected, setIsConnected] = useState(false);
    const [socketError, setSocketError] = useState(null);

    useEffect(() => {
        // Configuration de Socket.io avec des options de reconnexion
        const socket = io(url, {
            withCredentials: true,
            transports: ['websocket', 'polling'],
            reconnectionAttempts: 5,
            reconnectionDelay: 1000
        });
        
        // Utiliser un debounce pour les mises à jour de statistiques
        const debouncedOnStatsUpdate = debounce(onStatsUpdate, 300);
        
        // Gestionnaires d'événements
        socket.on('connect', () => {
            console.log('Connecté au serveur WebSocket');
            setIsConnected(true);
            setSocketError(null);
        });
        
        socket.on('disconnect', () => {
            console.log('Déconnecté du serveur WebSocket');
            setIsConnected(false);
        });
        
        socket.on('connect_error', (error) => {
            console.error('Erreur de connexion WebSocket:', error);
            setIsConnected(false);
            setSocketError('Impossible de se connecter au serveur de notifications en temps réel');
        });
        
        socket.on('welcome', (data) => {
            console.log('Message de bienvenue reçu:', data);
        });
        
        socket.on('reservationUpdated', (data) => {
            console.log('Mise à jour des statistiques reçue:', data);
            debouncedOnStatsUpdate(data);
        });
        
        // Nettoyage à la déconnexion
        return () => {
            console.log('Déconnexion du WebSocket...');
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
            socket.off('welcome');
            socket.off('reservationUpdated');
            socket.disconnect();
        };
    }, [url, onStatsUpdate]);

    return { isConnected, socketError };
};

const ManagerDashboard = () => {
    const [stats, setStats] = useState({
        addedGrounds: 0,
        availableGrounds: 0,
        averagePrice: 0
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Fonction pour récupérer les statistiques initiales
    const fetchStats = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get('/protected/gestionnaire/stats', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setStats(response.data);
            setError('');
        } catch (err) {
            console.error('Erreur lors de la récupération des statistiques :', err);
            setError(err.response?.data?.message || 'Erreur lors de la récupération des statistiques.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Handler pour mettre à jour les stats depuis le socket
    const handleStatsUpdate = useCallback((data) => {
        setStats(data);
    }, []);

    // Utilisation du hook personnalisé
    const { isConnected: socketConnected, socketError } = useSocket(SOCKET_SERVER_URL, handleStatsUpdate);

    useEffect(() => {
        // Récupérez les statistiques initiales
        fetchStats();
    }, [fetchStats]);

    // Mémoriser les données pour les graphiques pour éviter des re-calculs inutiles
    const pieData = useMemo(() => [
        { name: 'Disponibles', value: stats.availableGrounds || 0 },
        { name: 'Non disponibles', value: (stats.addedGrounds || 0) - (stats.availableGrounds || 0) }
    ], [stats.addedGrounds, stats.availableGrounds]);

    const barData = useMemo(() => [
        { name: 'Prix moyen', value: stats.averagePrice || 0 }
    ], [stats.averagePrice]);

    const COLORS = ['#28a745', '#dc3545'];

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid bg-light p-4 rounded">
            {socketError && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Attention!</strong> {socketError}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}
            
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            
            <div className="row mb-4">
                <div className="col-12">
                    <h1 className="text-center text-primary fw-bold">Bilan des Actions</h1>
                    {socketConnected ? (
                        <p className="text-center text-success">
                            <small>
                                <i className="fas fa-circle me-1"></i> Connecté aux mises à jour en temps réel
                            </small>
                        </p>
                    ) : (
                        <p className="text-center text-secondary">
                            <small>
                                <i className="fas fa-circle me-1"></i> Mode hors ligne - Pas de mises à jour en temps réel
                            </small>
                        </p>
                    )}
                </div>
            </div>
            
            <div className="row mb-4">
                <div className="col-md-4 mb-3">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                            <h3 className="card-title">Terrains ajoutés</h3>
                            <p className="display-4 text-primary">{stats.addedGrounds || 0}</p>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 mb-3">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                            <h3 className="card-title">Terrains disponibles</h3>
                            <p className="display-4 text-success">{stats.availableGrounds || 0}</p>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-4 mb-3">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body text-center">
                            <h3 className="card-title">Prix moyen des terrains</h3>
                            <p className="display-4 text-warning">
                                {stats.averagePrice ? `${Number(stats.averagePrice).toLocaleString('fr-FR')} €` : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row mt-4">
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white">
                            <h3 className="text-center mb-0">Disponibilité des terrains</h3>
                        </div>
                        <div className="card-body">
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={true}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value} terrains`, 'Quantité']} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white">
                            <h3 className="text-center mb-0">Prix moyen (€)</h3>
                        </div>
                        <div className="card-body">
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart data={barData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [`${Number(value).toLocaleString('fr-FR')} €`, 'Montant']} />
                                        <Bar dataKey="value" fill="#007bff" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row mt-4">
                <div className="col-12 text-center">
                    <button 
                        className="btn btn-primary" 
                        onClick={fetchStats}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Chargement...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sync-alt me-2"></i>
                                Rafraîchir les données
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;