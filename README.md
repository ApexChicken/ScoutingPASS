<div id="top"></div>

# SCOUTINGPASS 4564 EDITION

## Heavily modified fork of FRC team 2451 "PWNAGE", made for FRC team 4564 "ORANGE CHAOS"

## This fork of SCOUTINGPASS maintains the skeleton of the original version, while implimenting many features our team is using. We use a offline server that has the data uploaded by USB, rather than by QR code. Once uploaded, the data is used with a prediction algorithm to make decisions during alliance selection.

## Features:

### Updated 2026 code, including questions and backend
### Heavy 4564 color design/aesthetics
### TSV File download

---

# Backend / Auth

The static site is wrapped in a small Node.js server that puts all pages behind a login. The server uses SQLite for user storage and JWT cookies for sessions.

## Quick start (local)

```bash
# 1. install deps
cd server
npm install
cd ..

# 2. create .env from the template
cp .env.example .env

# 3. generate a JWT secret and paste it into .env
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"

# 4. create your first user
cd server
npm run create-user -- yourname yourpassword
npm start
```

Open http://localhost:3000, log in, you're in.

## Configuration

All configuration is in `.env` (see `.env.example`):

| Variable | What it does |
|---|---|
| `JWT_SECRET` | Required. ≥32 chars. Used to sign session tokens. |
| `ALLOW_REGISTRATION` | `true` to enable `/register`. Default `false`. |
| `PORT` | Default `3000`. |
| `NODE_ENV` | `production` or `development`. Affects cookie `Secure` flag. |
| `CLOUDFLARE_TUNNEL_TOKEN` | Only needed when running with `docker compose`. |
| `DATABASE_PATH` | Optional override. Default `server/data/app.db`. |

## Making a page public

By default, every page requires login. To opt a path out, edit the `PUBLIC_PATHS` array at the top of [server/src/index.js](server/src/index.js):

```js
const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/healthz',
  '/favicon.ico',
  // add more here, e.g.:
  // '/about.html',
  // '/public-stuff/',     // trailing slash = prefix match
];
```

## Adding users

Registration is disabled in production. To add a user, run the CLI:

```bash
cd server
npm run create-user -- alice mypassword
```

**Important:** the SQLite file (`server/data/app.db`) is committed to git. After creating users, commit and push the updated `.db` file so the deployed server has them. Don't create users on the production server — they'll be lost on the next deploy.

## Resetting the database

Wipe all users and start over:

```bash
cd server
npm run reset-db -- --yes
```

This deletes `server/data/app.db` and recreates it with the default schema. The `--yes` flag is required so you don't fat-finger it.

## Docker / production deploy

The server runs in Docker. A second service in `docker-compose.yml` runs Cloudflare Tunnel to expose it over HTTPS without opening any ports.

### One-time host setup

1. Install Docker + Docker Compose on the host.
2. Create a Cloudflare Tunnel:
   - Cloudflare Zero Trust → Networks → Tunnels → Create a tunnel (Cloudflared).
   - Copy the tunnel **token**.
   - Add a Public Hostname routing your domain to `http://app:3000`.
3. Clone this repo to the host:
   ```bash
   git clone <repo-url> /opt/scoutingpass
   cd /opt/scoutingpass
   ```
4. Create `.env`:
   ```bash
   cp .env.example .env
   # fill in JWT_SECRET and CLOUDFLARE_TUNNEL_TOKEN
   ```
5. Bring it up:
   ```bash
   docker compose up -d --build
   ```

### Updating

```bash
cd /opt/scoutingpass
git pull
docker compose up -d --build
```

That's the whole deploy story. No CI, no registry, no secrets in GitHub.

### Rolling back

```bash
git checkout <previous-commit-sha>
docker compose up -d --build
```

## How auth works (short version)

- Passwords are hashed with **argon2id**.
- Login issues a single JWT (HS256, 24h) stored in an `HttpOnly`, `Secure`, `SameSite=Lax` cookie.
- Logout bumps `users.token_version`. The JWT carries the version it was minted with — verification fails when they don't match. So any prior cookies are dead immediately.
- The server fails to start if `JWT_SECRET` is missing or too short.

## File layout

```
.
├─ index.html, pit.html, 2026/, 2025/, resources/   ← existing static site
├─ public/
│  ├─ login.html
│  └─ register.html
├─ server/
│  ├─ package.json
│  ├─ src/
│  │  ├─ index.js           ← express app, routes, gate
│  │  ├─ db.js              ← sqlite + tiny query functions
│  │  ├─ auth.js            ← jwt + password helpers + middleware
│  │  └─ create-user.js     ← CLI
│  └─ data/
│     └─ app.db             ← committed to git
├─ Dockerfile
├─ docker-compose.yml
└─ .env.example
```
