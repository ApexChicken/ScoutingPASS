#!/usr/bin/env node
// Usage:  npm run reset-db -- --yes
//   or:   node src/reset-db.js --yes
//
// Deletes the SQLite database file and recreates it with the default schema.
// All users are wiped. The --yes flag is required to prevent fat-fingering.

const path = require('path');
const fs = require('fs');

const REPO_ROOT = path.resolve(__dirname, '../..');
const ROOT_ENV = path.join(REPO_ROOT, '.env');
const SERVER_ENV = path.join(REPO_ROOT, 'server/.env');
require('dotenv').config({ path: fs.existsSync(ROOT_ENV) ? ROOT_ENV : SERVER_ENV });

const DEFAULT_DB_PATH = path.join(REPO_ROOT, 'server/data/app.db');
const DB_PATH = process.env.DATABASE_PATH || DEFAULT_DB_PATH;

if (!process.argv.includes('--yes')) {
  console.error('This will DELETE the database and wipe all users:');
  console.error(`  ${DB_PATH}`);
  console.error('');
  console.error('Run again with --yes to confirm:');
  console.error('  npm run reset-db -- --yes');
  process.exit(1);
}

for (const suffix of ['', '-shm', '-wal']) {
  const p = DB_PATH + suffix;
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log(`removed ${p}`);
  }
}

// Importing db.js runs CREATE TABLE IF NOT EXISTS, recreating the schema.
require('./db');
console.log(`schema recreated at ${DB_PATH}`);
