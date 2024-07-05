const Database = require('better-sqlite3');
const db = new Database('./users.db');

function getUsersByScore(type) {
    try {
        const rows = db.prepare(`SELECT username, bestSequenceBestOf${type} AS score FROM users ORDER BY score DESC`).all();
        return Promise.resolve(rows);
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = { getUsersByScore };