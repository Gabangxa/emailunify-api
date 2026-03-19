'use strict';

const router = require('express').Router();
const { addEvent } = require('../store/events');

const VALID_PROVIDERS = ['sendgrid', 'postmark'];

function normalizeEvent(provider, raw) {
  return {
    id: 'evt_' + Math.random().toString(36).slice(2, 10),
    provider,
    type: raw.event || raw.type || raw.RecordType || 'delivered',
    email: raw.email || raw.Email || raw.to || 'unknown@unknown.com',
    message_id: raw.sg_message_id || raw.MessageID || raw.message_id || ('wh_' + Math.random().toString(36).slice(2)),
    timestamp: raw.timestamp ? new Date(raw.timestamp * 1000).toISOString() : (raw.ReceivedAt || new Date().toISOString()),
    metadata: {
      subject: raw.subject || raw.Subject || '',
      tags: raw.tags || []
    }
  };
}

router.post('/inbound/:provider', (req, res) => {
  const { provider } = req.params;
  if (!VALID_PROVIDERS.includes(provider)) {
    return res.status(400).json({ error: `Unknown provider: ${provider}` });
  }

  const body = req.body;
  const rawEvents = Array.isArray(body) ? body : [body];
  const normalized = rawEvents.map(e => normalizeEvent(provider, e));
  normalized.forEach(e => addEvent(e));

  res.json({ status: 'ok', events_ingested: normalized.length });
});

module.exports = router;
