const {createAchievement} = require("./achievementService");
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/myapp.db');

function getAllActivities(callback) {
    const query = 'SELECT * FROM activities';

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            const activities = rows.map((row) => ({
                id: row.id,
                name: row.name,
                color: row.color,
                days: JSON.parse(row.days),
                timestamps: JSON.parse(row.timestamps),
                userId: row.user_id,
            }));
            callback(null, activities);
        }
    });
}

function createActivity(name, color, days, timestamps, userId, callback) {
    const query = 'INSERT INTO activities (name, color, days, timestamps, user_id) VALUES (?, ?, ?, ?, ?)';

    // Convert the 'days' and 'timestamps' arrays to JSON strings
    const daysJSON = JSON.stringify(days);
    const timestampsJSON = JSON.stringify(timestamps);

    db.run(query, [name, color, daysJSON, timestampsJSON, userId], function (err) {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            const newActivity = {
                id: this.lastID,
                name,
                color,
                days,
                timestamps,
                userId,
            };
            callback(null, newActivity);

            // Create locked achievements for the new activity
            createLockedAchievements(newActivity.id);
        }
    });
}

function createLockedAchievements(activityId) {
    const achievements = [
        { name: 'Do this activity once', activityId },
        { name: 'Do this activity 10 times', activityId },
        { name: 'Do this activity for 30 days', activityId },
        { name: 'Do this activity for half a year', activityId },
        { name: 'Do this activity for over a year', activityId },
    ];

    achievements.forEach((achievement) => {
        createAchievement(achievement.name, achievement.activityId, (err, newAchievement) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Created achievement:', newAchievement);
            }
        });
    });
}


module.exports = {
    getAllActivities,
    createActivity,
};