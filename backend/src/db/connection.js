const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const { DATA_DIRECTORY } = require('../config/appConfig');

const databasePath = path.join(DATA_DIRECTORY, 'store.db');

if (!fs.existsSync(DATA_DIRECTORY)) {
  fs.mkdirSync(DATA_DIRECTORY, { recursive: true });
}

const db = new sqlite3.Database(databasePath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite database', err);
  } else {
    console.log(`Connected to SQLite database at ${databasePath}`);
  }
});

const run = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function runCallback(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });

const get = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });

const all = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

module.exports = {
  db,
  run,
  get,
  all,
  databasePath,
};

