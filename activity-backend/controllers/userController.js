const express = require('express');
const userService = require('../services/userService');
const {getAllActivities} = require("../services/activityService");
const {getAllAchievements} = require("../services/achievementService");

const router = express.Router();

// GET /users
router.get('/', (req, res) => {
    userService.getAllUsers((err, users) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch users' });
        } else {
            res.json(users);
        }
    });
});

// GET /users/:id
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    userService.getUserById(userId, (err, user) => {
        if (err) {
            console.error(err);
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(user);
        }
    });
});

// GET /users/email/:email?search=:searchTerm
router.get('/email/:email', (req, res) => {
    const userEmail = req.params.email;
    const searchTerm = req.query.search;

    userService.getUserByEmail(userEmail, (err, user) => {
        if (err) {
            console.error(err);
            res.status(404).json({ error: 'User not found' });
        } else if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            getAllActivities((err, activities) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    const userWithActivities = {
                        ...user,
                        activities: activities.filter(activity => activity.userId === user.id),
                    };

                    getAllAchievements((err, achievements) => {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ error: 'Internal server error' });
                        } else {
                            userWithActivities.activities.forEach(activity => {
                                activity.achievements = achievements.filter(achievement => achievement.activityId === activity.id);
                            });

                            // Filter activities based on the search term
                            if (searchTerm) {
                                userWithActivities.activities = userWithActivities.activities.filter(activity => activity.name.toLowerCase().includes(searchTerm.toLowerCase()));
                            }

                            res.json(userWithActivities);
                        }
                    });
                }
            });
        }
    });
});

// DELETE /users/:id
router.delete('/:id', (req, res) => {
    const userId = req.params.id;

    userService.getUserById(userId, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch user' });
        } else if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            userService.deleteUser(userId, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Failed to delete user' });
                } else {
                    res.sendStatus(204);
                }
            });
        }
    });
});

// POST /users/register
router.post('/register', (req, res) => {
    const { email, phone_number, password, full_name } = req.body;
    userService.createUser(email, phone_number, password, full_name, (err, newUser) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create user' });
        } else {
            res.json(newUser);
        }
    });
});

// POST /users/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    userService.loginUser(email, password, (err, user) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to login' });
        } else if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            const token = userService.generateToken(user);
            res.json({ token });
        }
    });
});

// PATCH /users/:id
router.patch('/:id', (req, res) => {
    const userId = req.params.id;
    const { phone_number, email } = req.body;

    userService.updateUser(userId, { phone_number, email }, (err, updatedUser) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to update user' });
        } else if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(updatedUser);
        }
    });
});


module.exports = router;
