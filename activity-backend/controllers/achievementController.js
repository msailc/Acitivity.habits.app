const express = require('express');
const achievementService = require('../services/achievementService');

const router = express.Router();

// GET /achievements
router.get('/', (req, res) => {
    achievementService.getAllAchievements((err, achievements) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch achievements' });
        } else {
            res.json(achievements);
        }
    });
});

// POST /achievements
router.post('/', (req, res) => {
    const { name, activity_id } = req.body;
    achievementService.createAchievement(name, activity_id, (err, newAchievement) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create achievement' });
        } else {
            res.json(newAchievement);
        }
    });
});

// UNLOCK ACHIEVEMENT STATE - PATCH /achievements/:id
router.patch('/:id', (req, res) => {
    const achievementId = req.params.id;
    const { state } = req.body;
    achievementService.updateAchievementState(achievementId, state, (err, achievement) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update achievement state' });
        } else {
            res.json(achievement);
        }

    }
    );
});


module.exports = router;
