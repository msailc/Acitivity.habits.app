const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const userController = require('./controllers/userController');
const activityController = require('./controllers/activityController');
const achievementController = require('./controllers/achievementController');

const app = express();
const port = 3016;

// Create a connection to the SQLite database
const db = new sqlite3.Database('./db/myapp.db');

// Import and execute the SQL statements to create the tables
const createTables = () => {
    const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    full_name TEXT,
    phone_number TEXT,
    password TEXT,
    avatar TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`;


    const createActivitiesTable = `CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    color TEXT,
    days TEXT,
    timestamps TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
  )`;

    const createAchievementsTable = `CREATE TABLE IF NOT EXISTS achievements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    state TEXT DEFAULT 'locked',
    activity_id INTEGER,
    FOREIGN KEY (activity_id) REFERENCES activities (id)
)`;


    db.serialize(() => {
        db.run(createUsersTable);
        db.run(createActivitiesTable);
        db.run(createAchievementsTable);
    });
};

// Call the createTables function when the server starts
db.serialize(() => {
    createTables();
});

app.use(express.json());

app.use(cors());

app.use('/users', userController);
app.use('/activities', activityController);
app.use('/achievements', achievementController);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
