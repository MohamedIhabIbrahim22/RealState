const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

// GET route to fetch all employees
router.get('/employees', adminController.getEmp);

// POST route to add a new employee
router.post('/employees', adminController.addEmp);

// GET route to find a specific employee by ID (example)
router.get('/employees/:id', adminController.findEmp);

module.exports = router;
