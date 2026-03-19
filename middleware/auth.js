'use strict';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const apiKeyHeader = req.headers['x-api-key'];

  let apiKey = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    apiKey = authHeader.slice(7).trim();
  } else if (apiKeyHeader) {
    apiKey = apiKeyHeader.trim();
  }

  if (!apiKey || !apiKey.startsWith('eu_')) {
    return res.status(401).json({
      error: 'API key required. Use eu_demo_key_abc123 for demo.',
      hint: 'Pass header: X-API-Key: eu_demo_key_abc123'
    });
  }

  // Derive a workspace ID from the key (stable hash)
  req.workspaceId = 'ws_' + Buffer.from(apiKey).toString('base64').slice(0, 12);
  req.apiKey = apiKey;
  next();
}

module.exports = authMiddleware;
