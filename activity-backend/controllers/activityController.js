const express = require('express');
const activityService = require('../services/activityService');

const router = express.Router();

// GET /activities
router.get('/', (req, res) => {
    activityService.getAllActivities((err, activities) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch users' });
        } else {
            res.json(activities);
        }
    });
});

// POST /activities
router.post('/', (req, res) => {
    const { name, color, days, timestamps, userId } = req.body;
    activityService.createActivity(name, color, days, timestamps, userId, (err, newActivity) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create activity' });
        } else {
            res.json(newActivity);
        }
    });
});


module.exports = router;
