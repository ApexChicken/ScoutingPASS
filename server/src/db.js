const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const REPO_ROOT = path.resolve(__dirname, '../..');
const DEFAULT_DB_PATH = path.join(REPO_ROOT, 'server/data/app.db');
const DB_PATH = process.env.DATABASE_PATH || DEFAULT_DB_PATH;

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    username       TEXT    NOT NULL UNIQUE COLLATE NOCASE,
    password_hash  TEXT    NOT NULL,
    token_version  INTEGER NOT NULL DEFAULT 0,
    created_at     INTEGER NOT NULL
  );
`);

const stmts = {
  insertUser: db.prepare(
    'INSERT INTO users (username, password_hash, created_at) VALUES (?, ?, ?)'
  ),
  findByUsername: db.prepare('SELECT * FROM users WHERE username = ?'),
  findById: db.prepare('SELECT * FROM users WHERE id = ?'),
  bumpTokenVersion: db.prepare(
    'UPDATE users SET token_version = token_version + 1 WHERE id = ?'
  ),
  countUsers: db.prepare('SELECT COUNT(*) AS n FROM users'),
};

function createUser(username, passwordHash) {
  const info = stmts.insertUser.run(username, passwordHash, Date.now());
  return findUserById(info.lastInsertRowid);
}

function findUserByUsername(username) {
  return stmts.findByUsername.get(username);
}

function findUserById(id) {
  return stmts.findById.get(id);
}

function bumpTokenVersion(id) {
  stmts.bumpTokenVersion.run(id);
}

function userCount() {
  return stmts.countUsers.get().n;
}

module.exports = {
  db,
  DB_PATH,
  createUser,
  findUserByUsername,
  findUserById,
  bumpTokenVersion,
  userCount,
};
