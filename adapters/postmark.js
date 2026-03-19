'use strict';

const EVENT_TYPES = ['delivered', 'opened', 'clicked', 'bounced', 'spam', 'unsubscribed'];
const EMAILS = ['frank@saasco.io', 'grace@buildfast.co', 'henry@webapp.dev', 'iris@codelab.io', 'jack@microco.net'];
const SUBJECTS = ['Payment confirmed', 'Action required: verify email', 'Your report is ready', 'Login from new device'];

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomId(p) { return p + Math.random().toString(36).slice(2, 10); }

function generateMockEvents(count = 15) {
  return Array.from({ length: count }, () => ({
    id: randomId('evt_'),
    provider: 'postmark',
    type: randomItem(EVENT_TYPES),
    email: randomItem(EMAILS),
    message_id: randomId('pm_msg_'),
    timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    metadata: { subject: randomItem(SUBJECTS), tags: ['transactional'] }
  }));
}

async function fetchEvents(apiKey, since) {
  if (apiKey && apiKey.startsWith('DEMO_')) {
    return generateMockEvents(15);
  }
  try {
    // Real Postmark fetch would go here — graceful fallback for demo
    return [];
  } catch {
    return [];
  }
}

module.exports = { fetchEvents };
