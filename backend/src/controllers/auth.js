// controllers/auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../db/connection');

// Register user
const registerUser = (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Save the user in the database
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to register user' });
        }
        res.status(200).json({ message: 'User registered successfully' });
    });
};

// Login user
const loginUser = (req, res) => {
    const { username, password } = req.body;

    // Retrieve the user from the database
    const sql = 'SELECT * FROM users WHERE username = ?';
    connection.query(sql, [username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to login' });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare passwords
        const user = result[0];
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate and send JWT token
        const token = jwt.sign({ userId: user.id }, 'your-secret-key');
        res.status(200).json({ token });
    });
};

// Logout user
const logoutUser = (req, res) => {
    // You can clear the user session or token here
    res.status(200).json({ message: 'User logged out successfully' });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
};
