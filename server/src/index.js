const path = require('path');
const fs = require('fs');

// Load .env from repo root if present, then fall back to server/.env.
const REPO_ROOT = path.resolve(__dirname, '../..');
const ROOT_ENV = path.join(REPO_ROOT, '.env');
const SERVER_ENV = path.join(REPO_ROOT, 'server/.env');
require('dotenv').config({ path: fs.existsSync(ROOT_ENV) ? ROOT_ENV : SERVER_ENV });

const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const {
  createUser,
  findUserByUsername,
  bumpTokenVersion,
  userCount,
} = require('./db');
const {
  hashPassword,
  verifyPassword,
  signToken,
  setAuthCookie,
  clearAuthCookie,
  authenticate,
  requireAuth,
} = require('./auth');

// ─────────────────────────────────────────────────────────────────────────────
// Public paths — anything listed here bypasses login.
// Exact match, OR prefix match if the entry ends with a slash.
// Add paths here to make them publicly viewable.
// ─────────────────────────────────────────────────────────────────────────────
const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/healthz',
  '/favicon.ico',
];

function isPublic(reqPath) {
  return PUBLIC_PATHS.some(
    (p) => p === reqPath || (p.endsWith('/') && reqPath.startsWith(p))
  );
}

const PORT = Number(process.env.PORT) || 3000;
const ALLOW_REGISTRATION = process.env.ALLOW_REGISTRATION === 'true';
const isProd = process.env.NODE_ENV === 'production';

const app = express();

if (isProd) app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: false, // existing inline scripts in index.html / pit.html would break otherwise
    crossOriginEmbedderPolicy: false,
  })
);
app.use(express.json({ limit: '64kb' }));
app.use(cookieParser());

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Routes ──────────────────────────────────────────────────────────────────

app.get('/healthz', (_req, res) => res.json({ ok: true }));

app.get('/login', (_req, res) =>
  res.sendFile(path.join(REPO_ROOT, 'public/login.html'))
);

app.get('/register', (_req, res) => {
  if (!ALLOW_REGISTRATION) return res.redirect('/login');
  res.sendFile(path.join(REPO_ROOT, 'public/register.html'));
});

app.post('/auth/register', authLimiter, async (req, res) => {
  if (!ALLOW_REGISTRATION) {
    return res.status(403).json({ error: 'registration disabled' });
  }
  const { username, password } = req.body || {};
  if (!isValidUsername(username) || !isValidPassword(password)) {
    return res.status(400).json({ error: 'invalid username or password' });
  }
  if (findUserByUsername(username)) {
    return res.status(409).json({ error: 'username taken' });
  }
  const hash = await hashPassword(password);
  const user = createUser(username, hash);
  const token = await signToken(user);
  setAuthCookie(res, token);
  res.json({ id: user.id, username: user.username });
});

app.post('/auth/login', authLimiter, async (req, res) => {
  const { username, password } = req.body || {};
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'invalid request' });
  }
  const user = findUserByUsername(username);
  // Always run argon2 verify against something to avoid leaking which field was wrong via timing.
  const ok = user
    ? await verifyPassword(password, user.password_hash)
    : await verifyPassword(password, '$argon2id$v=19$m=65536,t=3,p=4$AAAAAAAAAAAAAAAAAAAAAA$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  if (!user || !ok) {
    return res.status(401).json({ error: 'invalid credentials' });
  }
  const token = await signToken(user);
  setAuthCookie(res, token);
  res.json({ id: user.id, username: user.username });
});

app.post('/auth/logout', async (req, res) => {
  const user = await authenticate(req);
  if (user) bumpTokenVersion(user.id);
  clearAuthCookie(res);
  res.json({ ok: true });
});

app.get('/auth/me', requireAuth, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
});

// ─── Gate everything else ────────────────────────────────────────────────────

app.use((req, res, next) => {
  if (isPublic(req.path)) return next();
  return requireAuth(req, res, next);
});

// HTML interception: inject the floating logout UI into authenticated HTML
// pages without touching the underlying files on disk. Runs before static
// serving so we get first crack at *.html responses.
const PUBLIC_DIR = path.join(REPO_ROOT, 'public');
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  const reqPath = req.path === '/' ? '/index.html' : req.path;
  if (!reqPath.endsWith('.html')) return next();

  const candidates = [
    path.join(REPO_ROOT, reqPath),
    path.join(PUBLIC_DIR, reqPath),
  ];
  const filePath = candidates.find((p) => safeExistsUnder(p, [REPO_ROOT]));
  if (!filePath) return next();

  // Don't inject into the login/register pages themselves.
  if (filePath.startsWith(PUBLIC_DIR + path.sep)) return next();

  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) return next();
    const tag = '<script src="/auth-ui.js"></script>';
    const out = html.includes('</body>')
      ? html.replace('</body>', `${tag}\n</body>`)
      : html + tag;
    res.set('Cache-Control', 'no-cache');
    res.type('html').send(out);
  });
});

// Static — public/ takes precedence so /login.html etc. resolve before falling
// back to the existing site files at the repo root.
app.use(express.static(PUBLIC_DIR));
app.use(
  express.static(REPO_ROOT, {
    index: 'index.html',
    dotfiles: 'ignore',
  })
);

app.use((req, res) => res.status(404).send('not found'));

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isValidUsername(u) {
  return typeof u === 'string' && /^[a-zA-Z0-9_.-]{3,32}$/.test(u);
}
function isValidPassword(p) {
  return typeof p === 'string' && p.length >= 8 && p.length <= 128;
}
function safeExistsUnder(filePath, allowedRoots) {
  const resolved = path.resolve(filePath);
  if (!allowedRoots.some((root) => resolved.startsWith(path.resolve(root) + path.sep))) {
    return false;
  }
  try {
    return fs.statSync(resolved).isFile();
  } catch {
    return false;
  }
}

// ─── Boot ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  const n = userCount();
  console.log(`ScoutingPASS server listening on :${PORT}`);
  console.log(`  registration: ${ALLOW_REGISTRATION ? 'OPEN' : 'disabled'}`);
  console.log(`  users in db:  ${n}`);
  if (n === 0 && !ALLOW_REGISTRATION) {
    console.log('  WARNING: no users exist and registration is disabled.');
    console.log('  Create one with:  npm run create-user -- <username> <password>');
  }
});
