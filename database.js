// database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error opening database', err);
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);
});

function addUser(username, password, callback) {
    const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    stmt.run(username, password, (err) => {
        callback(err, this.lastID);
    });
    stmt.finalize();
}

function getUser(username, callback) {
    db.get("SELECT * FROM users WHERE username = ?", username, (err, row) => {
        callback(err, row);
    });
}

module.exports = { addUser, getUser };
