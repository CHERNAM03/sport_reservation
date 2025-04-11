const User = require('../models/UsersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { col } = require('sequelize');

const authController = {
    signup: async (req, res) => {
        try {
            const { username, email, password } = req.body;
    
            // Hachez le mot de passe avant de le sauvegarder
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            console.log('Mot de passe haché :', hashedPassword);
            console.log('Mot de passe en clair :', password);
            console.log('Email :', email);
            console.log('Nom d\'utilisateur :', username);
    
            const user = await User.create({
                username,
                email,
                password: password,
                role: 'user' // Par défaut, le rôle est "user"
            });
    
            const token = jwt.sign(
                { id: user.id ,role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
    
            return res.status(201).json({
                username: user.username,
                role: user.role, // Inclure le rôle dans la réponse
                email: user.email,
                message: 'User created successfully',
                token
            });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(400).json({
                message: 'Error creating user in Signup controller',
                error: error.message
            });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            console.log('Mot de passe en clair :', password);
            console.log('Mot de passe haché dans la base de données :', user.password);
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'An error occurred during login' });
        }
        }
    };

module.exports = authController;