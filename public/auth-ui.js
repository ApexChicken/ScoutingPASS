// Floating "logged in as ___ / logout" pill, injected automatically into every
// authenticated HTML page by the server. Top-right so it stays clear of the
// fixed bottom nav (Next/Prev buttons).

(async () => {
  let me = null;
  try {
    const r = await fetch('/auth/me', { credentials: 'same-origin' });
    if (r.ok) me = await r.json();
  } catch {}
  if (!me) return;

  const wrap = document.createElement('div');
  wrap.id = 'sp-auth-ui';
  wrap.innerHTML = `
    <style>
      #sp-auth-ui {
        position: fixed;
        right: 10px;
        top: 10px;
        z-index: 99999;
        font-family: 'Share Tech Mono', monospace, monospace;
        font-size: 10px;
        letter-spacing: 1.5px;
        color: #999;
        background: rgba(16,16,16,0.92);
        border: 1px solid #252525;
        border-bottom: 1px solid #FF5500;
        padding: 6px 10px;
        box-shadow: 0 2px 12px rgba(255,85,0,0.18);
        display: flex;
        align-items: center;
        gap: 10px;
        pointer-events: auto;
      }
      #sp-auth-ui .sp-user { color: #e0e0e0; text-transform: uppercase; }
      #sp-auth-ui .sp-logout {
        color: #FF5500;
        text-decoration: none;
        cursor: pointer;
        text-transform: uppercase;
        font-weight: bold;
      }
      #sp-auth-ui .sp-logout:hover { filter: brightness(1.2); }
    </style>
    <span class="sp-user"></span>
    <a href="#" class="sp-logout">LOGOUT</a>
  `;
  wrap.querySelector('.sp-user').textContent = me.username;
  wrap.querySelector('.sp-logout').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await fetch('/auth/logout', { method: 'POST', credentials: 'same-origin' });
    } catch {}
    location.href = '/login';
  });
  document.body.appendChild(wrap);
})();
