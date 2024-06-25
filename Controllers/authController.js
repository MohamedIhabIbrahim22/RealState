const User = require('../models/User'); // Assuming you have a User model

// Handle user signup
const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error signing up:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Handle user login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email and password
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Set session or token for authenticated user
        req.session.user = user; // Example: using session for simplicity

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Handle user logout (clear session or token)
const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/'); // Redirect to homepage or login page
};

module.exports = { signup, login, logout };
