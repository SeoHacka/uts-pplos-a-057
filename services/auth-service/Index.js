const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

// In-memory user store (replace with DB later)
const users = [
  { id: 1, email: 'test@example.com', password: bcrypt.hashSync('password123', 8) }
];

// JWT secrets
const ACCESS_SECRET = 'your_access_secret';
const REFRESH_SECRET = 'your_refresh_secret';

// Token lifetimes
const ACCESS_EXPIRES = '15m';
const REFRESH_EXPIRES = '7d';

// Store refresh tokens (simple array for demo)
let refreshTokens = [];

// --- LOGIN (email + password) ---
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = jwt.sign({ id: user.id }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
  const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

// --- REFRESH TOKEN ---
app.post('/refresh', (req, res) => {
  const { token } = req.body;
  if (!token || !refreshTokens.includes(token)) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
  try {
    const payload = jwt.verify(token, REFRESH_SECRET);
    const accessToken = jwt.sign({ id: payload.id }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES });
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: 'Token expired' });
  }
});

// --- LOGOUT ---
app.post('/logout', (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token);
  res.json({ message: 'Logged out' });
});

// --- GitHub OAuth ---
const CLIENT_ID = 'your_github_client_id';
const CLIENT_SECRET = 'your_github_client_secret';
const REDIRECT_URI = 'http://localhost:4000/oauth/callback';

app.get('/oauth/login', (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  res.redirect(url);
});

app.get('/oauth/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      { client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code },
      { headers: { Accept: 'application/json' } }
    );
    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const { login, email, avatar_url } = userRes.data;
    res.json({ login, email, avatar_url });
  } catch (err) {
    res.status(500).json({ message: 'OAuth failed', error: err.message });
  }
});

// --- Protected route example ---
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];
  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'You accessed a protected route!', user: req.user });
});

app.listen(4000, () => console.log('Auth Service running on port 4000'));
