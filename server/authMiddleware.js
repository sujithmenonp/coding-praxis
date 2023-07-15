const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  jwt.verify(token, 'your_secret_key_here', (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.userId = decodedToken.userId;
    next();
  });
}

module.exports = authenticateToken;