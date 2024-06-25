const express = require('express');
const router = express.Router();
const Post = require('../models/PostForSale'); 

// Middleware to ensure authenticated user
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login'); // Redirect to login page if not authenticated
}

// Example route that requires authentication
router.post('/submit-post', ensureAuthenticated, (req, res) => {
    const { title, content } = req.body;
    const newPost = new Post({ title, content, author: req.user.id }); // Assuming you have user id in req.user
    newPost.save()
        .then(savedPost => res.redirect('/posts'))
        .catch(err => console.error(err));
});

module.exports = router;
