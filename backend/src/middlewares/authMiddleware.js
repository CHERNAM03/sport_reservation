
/* const jwt = require('jsonwebtoken');

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
}; */
const jwt = require('jsonwebtoken');

// Clé secrète JWT uniformisée
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware d'authentification
exports.authenticateToken = (req, res, next) => {
  console.log('Authentification: vérification du token pour', req.method, req.url);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Récupérer le token après "Bearer"

  if (!token) {
    console.log('Aucun token fourni');
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Erreur lors de la vérification du token :', err.message);
      return res.status(403).json({ message: 'Token invalide' });
    }
    console.log('Token décodé :', user); // Vérifiez que le rôle est présent
    console.log('Rôle reçu dans le token :', user.role);
    console.log('ID utilisateur reçu dans le token :', user.id);
    
    req.user = user;
    next();
  });
};

// Middleware d'autorisation par rôle
exports.authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      console.log('Utilisateur non authentifié');
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    console.log('Rôle utilisateur :', req.user.role);
    console.log('Rôles autorisés :', roles);

    if (!roles.includes(req.user.role)) {
      console.log('Accès refusé. Rôle insuffisant.');
      return res.status(403).json({ message: 'Accès refusé. Permissions insuffisantes.' });
    }
    
    console.log('Autorisation accordée pour le rôle:', req.user.role);
    next();
  };
};

// Route de test d'authentification
exports.setupTestRoute = (router) => {
  router.get('/test-auth', exports.authenticateToken, (req, res) => {
    res.json({ 
      message: 'Authentification réussie', 
      user: {
        id: req.user.id,
        role: req.user.role,
        tokenDecodedInfo: req.user
      }
    });
  });
};