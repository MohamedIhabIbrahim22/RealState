const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

// Example route for scheduling a meeting
router.post('/schedule', meetingController.scheduleMeeting);

// Example route for fetching scheduled meetings
router.get('/meetings', meetingController.getAllMeetings);

module.exports = router;
