const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/myapp.db');

function getAllUsers(callback) {
    const query = 'SELECT * FROM users';

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            const users = rows.map((row) => ({
                id: row.id,
                email: row.email,
                full_name: row.full_name,
                phone_number: row.phone_number,
                password: row.password,
                avatar: row.avatar,
                created_at: row.created_at,
            }));
            callback(null, users);
        }
    });
}

function createUser(email, phoneNumber, password, fullName, callback) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else {
            const defaultAvatar = 'https://i.ibb.co/GJhfxd6/BLABLA.png';
            const query = 'INSERT INTO users (email, phone_number, full_name, password, avatar) VALUES (?, ?, ?, ?, ?)';

            db.run(query, [email, phoneNumber, fullName,hashedPassword, defaultAvatar], function (err) {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else {
                    const newUser = {
                        id: this.lastID,
                        email,
                        full_name: fullName,
                        phone_number: phoneNumber,
                        password: hashedPassword,
                        avatar: defaultAvatar,
                        created_at: this.created_at,
                    };
                    callback(null, newUser);
                }
            });
        }
    });
}

function getUserById(id, callback) {
    const query = 'SELECT * FROM users WHERE id = ?';

    db.get(query, [id], (err, row) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else if (!row) {
            callback(new Error('User not found'), null);
        } else {
            const user = {
                id: row.id,
                email: row.email,
                full_name: row.full_name,
                phone_number: row.phone_number,
                password: row.password,
                avatar: row.avatar,
                created_at: row.created_at,
            };
            callback(null, user);
        }
    });
}

function getUserByEmail(email, callback) {
    const query = 'SELECT * FROM users WHERE email = ?';

    db.get(query, [email], (err, row) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else if (!row) {
            callback(null, null);
        } else {
            const user = {
                id: row.id,
                email: row.email,
                full_name: row.full_name,
                phone_number: row.phone_number,
                password: row.password,
                avatar: row.avatar,
                created_at: row.created_at,
            };
            callback(null, user);
        }
    });
}

function updateUser(id, updatedFields, callback) {
    const { phone_number, email } = updatedFields;
    const query = 'UPDATE users SET phone_number = ?, email = ? WHERE id = ?';

    db.run(query, [phone_number, email, id], function (err) {
        if (err) {
            console.error(err);
            callback(err, null);
        } else if (this.changes === 0) {
            callback(new Error('User not found'), null);
        } else {
            getUserById(id, callback);
        }
    });
}


function loginUser(email, password, callback) {
    const query = 'SELECT * FROM users WHERE email = ?';

    db.get(query, [email], (err, row) => {
        if (err) {
            console.error(err);
            callback(err, null);
        } else if (!row) {
            callback(null, null);
        } else {
            bcrypt.compare(password, row.password, (err, result) => {
                if (err) {
                    console.error(err);
                    callback(err, null);
                } else if (!result) {
                    callback(null, null);
                } else {
                    const user = {
                        id: row.id,
                        email: row.email,
                        phone_number: row.phone_number,
                    };
                    callback(null, user);
                }
            });
        }
    });
}

function generateToken(user) {
    const payload = {
        id: user.id,
        email: user.email,
        phone_number: user.phone_number,
    };
    const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });
    return token;
}

function deleteUser(id, callback) {
    const query = 'DELETE FROM users WHERE id = ?';

    db.run(query, [id], function (err) {
        if (err) {
            console.error(err);
            callback(err);
        } else if (this.changes === 0) {
            callback(new Error('User not found'));
        } else {
            callback(null);
        }
    });
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    getUserByEmail,
    loginUser,
    generateToken,
    updateUser,
    deleteUser,
};
