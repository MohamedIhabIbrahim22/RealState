const User = require('../models/Users'); // Assuming you have a User model

// Get user profile
const getUserProfile = async (req, res) => {
    const userId = req.params.userId; // Assuming userId is passed in the URL or session

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    const userId = req.params.userId; // Assuming userId is passed in the URL or session
    const { username, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
    const userId = req.params.userId; // Assuming userId is passed in the URL or session

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user profile:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getUserProfile, updateUserProfile, deleteUserProfile };
