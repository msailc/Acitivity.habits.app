const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/myapp.db');

function getAllAchievements(callback) {
    const query = 'SELECT * FROM achievements';

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            const achievements = rows.map((row) => ({
                id: row.id,
                name: row.name,
                state: row.state,
                activityId: row.activity_id,
            }));
            callback(null, achievements);
        }
    });
}

function createAchievement(name, activityId, callback) {
    const query = 'INSERT INTO achievements (name, activity_id) VALUES (?, ?)';

    db.run(query, [name, activityId], function (err) {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            const newAchievement = {
                id: this.lastID,
                name,
                activityId,
            };
            callback(null, newAchievement);
        }
    });
}

function updateAchievementState(achievementId, state, callback) {
    const query = 'UPDATE achievements SET state = ? WHERE id = ?';

    db.run(query, [state, achievementId], (err) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            callback(null, achievementId);
        }
    });
}

module.exports = {
    getAllAchievements,
    createAchievement,
    updateAchievementState,
};
