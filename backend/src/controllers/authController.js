
const User = require('../models/UsersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { col } = require('sequelize');

// Clé secrète JWT uniformisée
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const authController = {
    
    signup: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            
            // Validation des données
            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Tous les champs sont requis' });
            }
            
            // Vérifier si l'utilisateur existe déjà
            const existingUser = await User.findOne({ 
                where: { email } 
            });
            
            if (existingUser) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé' });
            }
            
            // Vérifier si le nom d'utilisateur existe déjà
            const existingUsername = await User.findOne({ 
                where: { username } 
            });
            
            if (existingUsername) {
                return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà utilisé' });
            }
    
            console.log('Création d\'un nouvel utilisateur:', username);
    
            // Créer l'utilisateur directement avec le mot de passe non hashé
            // Le hook beforeCreate dans le modèle User se chargera du hashage
            const user = await User.create({
                username,
                email,
                password, // Pas besoin de hasher ici, le hook s'en charge
                role: 'user' // Par défaut, le rôle est "user"
            });
    
            const token = jwt.sign(
                { id: user.id, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );
    
            return res.status(201).json({
                username: user.username,
                role: user.role,
                email: user.email,
                message: 'Utilisateur créé avec succès',
                token
            });
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
            res.status(400).json({
                message: 'Erreur lors de la création de l\'utilisateur',
                error: error.message
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            // Validation des données
            if (!email || !password) {
                return res.status(400).json({ message: 'Email et mot de passe requis' });
            }
            
            console.log('Tentative de connexion avec email:', email);
            
            const user = await User.findOne({ where: { email } });
            if (!user) {
                console.log('Utilisateur non trouvé avec email:', email);
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            
            console.log('Utilisateur trouvé avec ID:', user.id);
            
            // Supprimé les logs de mots de passe
            
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                console.log('Échec d\'authentification pour l\'utilisateur:', email);
                return res.status(401).json({ message: 'Mot de passe invalide' });
            }

            console.log('Authentification réussie, création du token JWT');
            const token = jwt.sign(
                { id: user.id, role: user.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            console.log('Token créé avec succès pour l\'utilisateur ID:', user.id);

            res.json({
                message: 'Connexion réussie',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            res.status(500).json({ 
                message: 'Une erreur est survenue lors de la connexion',
                error: error.message 
            });
        }
    },
    
    createAdmin: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            
            // Validation des données
            if (!username || !email || !password) {
                return res.status(400).json({ message: 'Tous les champs sont requis' });
            }
        
            // Vérifiez si un administrateur existe déjà
            const existingAdmin = await User.findOne({ where: { role: 'admin' } });
            if (existingAdmin) {
                console.log('Un administrateur existe déjà avec ID:', existingAdmin.id);
                return res.status(400).json({ message: 'Un administrateur existe déjà.' });
            }
            
            // Vérifiez si l'email existe déjà
            const existingEmail = await User.findOne({ where: { email } });
            if (existingEmail) {
                return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
            }

            // Vérifiez si le nom d'utilisateur existe déjà
            const existingUsername = await User.findOne({ where: { username } });
            if (existingUsername) {
                return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà utilisé.' });
            }
        
            // Hachez le mot de passe
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            console.log('Création d\'un nouvel administrateur:', username);
        
            // Créez l'utilisateur administrateur
            const admin = await User.create({
                username,
                email,
                password: hashedPassword,
                role: 'admin'
            });
        
            // Générer un jeton JWT
            const token = jwt.sign(
                { id: admin.id, role: admin.role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );
            
            console.log('Administrateur créé avec succès, ID:', admin.id);
        
            res.status(201).json({
                message: 'Administrateur créé avec succès.',
                admin: {
                    id: admin.id,
                    username: admin.username,
                    email: admin.email,
                    role: admin.role
                },
                token
            });
        } catch (error) {
            console.error('Erreur lors de la création de l\'administrateur :', error);
            res.status(500).json({ 
                message: 'Une erreur est survenue lors de la création de l\'administrateur.',
                error: error.message 
            });
        }
    },
    
    // Route pour tester le token et les informations utilisateur
    verifyToken: async (req, res) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            
            if (!token) {
                return res.status(401).json({ message: 'Token non fourni' });
            }
            
            jwt.verify(token, JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(403).json({ 
                        message: 'Token invalide', 
                        error: err.message 
                    });
                }
                
                // Vérifier si l'utilisateur existe toujours dans la base de données
                const user = await User.findByPk(decoded.id);
                if (!user) {
                    return res.status(404).json({ message: 'Utilisateur non trouvé' });
                }
                
                res.json({
                    message: 'Token valide',
                    tokenInfo: decoded,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    }
                });
            });
        } catch (error) {
            console.error('Erreur lors de la vérification du token:', error);
            res.status(500).json({ 
                message: 'Une erreur est survenue lors de la vérification du token',
                error: error.message 
            });
        }
    }
};

module.exports = authController;