'use strict';

const EVENT_TYPES = ['delivered', 'opened', 'clicked', 'bounced', 'spam', 'unsubscribed'];
const EMAILS = ['alice@acme.com', 'bob@startup.io', 'carol@devshop.co', 'dave@techcorp.net', 'eve@agency.dev'];
const SUBJECTS = ['Your invoice is ready', 'Welcome to the platform', 'Password reset', 'Weekly digest'];

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomId(p) { return p + Math.random().toString(36).slice(2, 10); }

function generateMockEvents(count = 20) {
  return Array.from({ length: count }, () => ({
    id: randomId('evt_'),
    provider: 'sendgrid',
    type: randomItem(EVENT_TYPES),
    email: randomItem(EMAILS),
    message_id: randomId('sg_msg_'),
    timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    metadata: { subject: randomItem(SUBJECTS), tags: ['transactional'] }
  }));
}

async function fetchEvents(apiKey, since) {
  if (apiKey && apiKey.startsWith('DEMO_')) {
    return generateMockEvents(20);
  }
  try {
    // Real SendGrid fetch would go here — graceful fallback for demo
    return [];
  } catch {
    return [];
  }
}

module.exports = { fetchEvents };
