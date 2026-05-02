#!/usr/bin/env node
// Usage:  npm run create-user -- <username> <password>
//   or:   node src/create-user.js <username> <password>
//
// Adds a user to the database. Use this when ALLOW_REGISTRATION=false.

const path = require('path');
const fs = require('fs');

const REPO_ROOT = path.resolve(__dirname, '../..');
const ROOT_ENV = path.join(REPO_ROOT, '.env');
const SERVER_ENV = path.join(REPO_ROOT, 'server/.env');
require('dotenv').config({ path: fs.existsSync(ROOT_ENV) ? ROOT_ENV : SERVER_ENV });

// JWT_SECRET isn't needed by this script, but auth.js fails closed if it's
// missing. Provide a placeholder so we can require argon2 helpers from there.
if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'cli-placeholder-not-used-for-signing-anything-just-passes-the-length-check';

const argon2 = require('argon2');
const { createUser, findUserByUsername, DB_PATH } = require('./db');

async function main() {
  const [username, password] = process.argv.slice(2);
  if (!username || !password) {
    console.error('usage: create-user <username> <password>');
    process.exit(1);
  }
  if (!/^[a-zA-Z0-9_.-]{3,32}$/.test(username)) {
    console.error('username must be 3–32 chars: letters, digits, _ . -');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('password must be at least 8 characters');
    process.exit(1);
  }
  if (findUserByUsername(username)) {
    console.error(`user '${username}' already exists`);
    process.exit(1);
  }
  const hash = await argon2.hash(password, { type: argon2.argon2id });
  const user = createUser(username, hash);
  console.log(`created user '${user.username}' (id=${user.id})`);
  console.log(`db: ${DB_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
