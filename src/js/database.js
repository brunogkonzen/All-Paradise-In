const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

function getUsersByScore(type) {
    return new Promise((resolve, reject) => {
        db.all(`SELECT username, bestSequenceBestOf${type} AS score FROM users ORDER BY score DESC`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = { getUsersByScore };