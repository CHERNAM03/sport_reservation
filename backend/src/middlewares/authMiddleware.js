
const jwt = require('jsonwebtoken');

// Middleware d'authentification
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Récupérer le token après "Bearer"

  if (!token) {
    console.log('Aucun token fourni');
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key', (err, user) => {
    if (err) {
      console.error('Erreur lors de la vérification du token :', err.message);
      return res.status(403).json({ message: 'Token invalide' });
    }
    console.log('Token décodé :', user); // Vérifiez que le rôle est présent
    req.user = user;
    next();
  });
};

// Middleware d'autorisation par rôle
exports.authorizeRoles = (roles) => {
  return (req, res, next) => {
    console.log('Rôle utilisateur :', req.user.role);
    console.log('Rôles autorisés :', roles);

    if (!roles.includes(req.user.role)) {
      console.log('Accès refusé. Rôle insuffisant.');
      return res.status(403).json({ message: 'Accès refusé. Permissions insuffisantes.' });
    }
    next();
  };
};