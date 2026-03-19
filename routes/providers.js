'use strict';

const router = require('express').Router();
const auth = require('../middleware/auth');
const sendgrid = require('../adapters/sendgrid');
const postmark = require('../adapters/postmark');
const { addEvent } = require('../store/events');

const VALID_PROVIDERS = ['sendgrid', 'postmark'];
const ADAPTERS = { sendgrid, postmark };

// In-memory provider registry: workspaceId -> providers[]
const registry = {};

router.post('/', auth, async (req, res) => {
  const { provider, api_key } = req.body || {};

  if (!provider || !VALID_PROVIDERS.includes(provider)) {
    return res.status(400).json({ error: `provider must be one of: ${VALID_PROVIDERS.join(', ')}` });
  }
  if (!api_key) {
    return res.status(400).json({ error: 'api_key is required' });
  }

  const workspace = req.workspaceId;
  if (!registry[workspace]) registry[workspace] = [];

  const provId = 'prov_' + Math.random().toString(36).slice(2, 10);
  const entry = { id: provId, provider, api_key, status: 'connected', last_synced: new Date().toISOString() };
  registry[workspace].push(entry);

  // Immediate mock fetch
  const adapter = ADAPTERS[provider];
  const fetched = await adapter.fetchEvents(api_key, null);
  fetched.forEach(e => addEvent(e));

  res.json({ id: provId, provider, status: 'connected', events_fetched: fetched.length });
});

router.get('/', auth, (req, res) => {
  const workspace = req.workspaceId;
  const providers = (registry[workspace] || []).map(({ id, provider, status, last_synced }) =>
    ({ id, provider, status, last_synced }));
  res.json({ providers });
});

module.exports = router;
