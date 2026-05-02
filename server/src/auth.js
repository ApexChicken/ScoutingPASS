const argon2 = require('argon2');
const { SignJWT, jwtVerify } = require('jose');
const { findUserById } = require('./db');

const COOKIE_NAME = 'sp_session';
const TOKEN_TTL_SECONDS = 60 * 60 * 24; // 24 hours
const ISSUER = 'scoutingpass';
const AUDIENCE = 'scoutingpass-web';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error(
    'JWT_SECRET must be set in .env and be at least 32 characters. ' +
      'Generate one with: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'base64url\'))"'
  );
}
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const isProd = process.env.NODE_ENV === 'production';

async function hashPassword(plain) {
  return argon2.hash(plain, { type: argon2.argon2id });
}

async function verifyPassword(plain, hash) {
  try {
    return await argon2.verify(hash, plain);
  } catch {
    return false;
  }
}

async function signToken(user) {
  return new SignJWT({ v: user.token_version })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(user.id))
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_TTL_SECONDS}s`)
    .sign(SECRET);
}

async function verifyToken(token) {
  const { payload } = await jwtVerify(token, SECRET, {
    issuer: ISSUER,
    audience: AUDIENCE,
  });
  return payload;
}

function setAuthCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: TOKEN_TTL_SECONDS * 1000,
  });
}

function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
  });
}

async function authenticate(req) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;
  let payload;
  try {
    payload = await verifyToken(token);
  } catch {
    return null;
  }
  const user = findUserById(Number(payload.sub));
  if (!user) return null;
  if (user.token_version !== payload.v) return null;
  return user;
}

async function requireAuth(req, res, next) {
  const user = await authenticate(req);
  if (!user) {
    if (req.accepts('html') && req.method === 'GET') {
      return res.redirect('/login');
    }
    return res.status(401).json({ error: 'unauthorized' });
  }
  req.user = user;
  next();
}

module.exports = {
  COOKIE_NAME,
  hashPassword,
  verifyPassword,
  signToken,
  verifyToken,
  setAuthCookie,
  clearAuthCookie,
  authenticate,
  requireAuth,
};
