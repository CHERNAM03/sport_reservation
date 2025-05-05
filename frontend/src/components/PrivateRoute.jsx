import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Vérifier si l'utilisateur est authentifié
        const token = localStorage.getItem('authToken');
        // Vérifier aussi l'ancien "token" au cas où
        const oldToken = localStorage.getItem('token');
        
        // Utiliser le nouveau token ou l'ancien si le nouveau n'existe pas
        const effectiveToken = token || oldToken;
        
        const role = localStorage.getItem('userRole');
        
        console.log('Token trouvé:', !!effectiveToken);
        console.log('Rôle utilisateur:', role);
        console.log('Rôles autorisés:', allowedRoles);

        if (effectiveToken && role) {
            setIsAuthenticated(true);
            setUserRole(role);
            
            // Si on utilise l'ancien token, le synchroniser avec la nouvelle clé
            if (oldToken && !token) {
                localStorage.setItem('authToken', oldToken);
            }
        } else {
            setIsAuthenticated(false);
        }
        
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
    if (!isAuthenticated) {
        console.error('Non authentifié, redirection vers /login');
        return <Navigate to="/login" />;
    }

    // Si l'utilisateur n'a pas le rôle requis, rediriger vers une page d'erreur
    if (!allowedRoles.includes(userRole)) {
        console.error(`Rôle "${userRole}" non autorisé, redirection vers /unauthorized`);
        return <Navigate to="/unauthorized" />;
    }

    // Sinon, afficher le composant enfant
    return children;
};

export default PrivateRoute;