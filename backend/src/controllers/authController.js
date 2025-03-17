const User = require('../models/UsersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authController = {
    signup: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            const user = await User.create({
                username,
                email,
                password
            });

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(201).json({
                username: user.username,
                email: user.email,
                password: user.password,
                message: 'User created successfully',
                token
            });
        } catch (error) {
            res.status(400).json({
                message: 'Error creating user',
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

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({
                message: 'Login successful',
                token
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error logging in',
                error: error.message
            });
        }
    }
};

module.exports = authController;