'use strict';

const events = [];

// Seed realistic mock data
const EMAILS = [
  'alice@acme.com', 'bob@startup.io', 'carol@devshop.co', 'dave@techcorp.net',
  'eve@agency.dev', 'frank@saasco.io', 'grace@buildfast.co', 'henry@webapp.dev',
  'iris@codelab.io', 'jack@microco.net', 'kate@appmaker.co', 'liam@softworks.io',
  'mia@freelance.dev', 'noah@dataco.net', 'olivia@cloudapp.io', 'peter@devteam.co'
];

const SUBJECTS = [
  'Your invoice is ready', 'Welcome to the platform', 'Password reset request',
  'Your order has shipped', 'Account verification', 'Weekly digest',
  'Your trial is expiring', 'New feature announcement', 'Payment confirmed',
  'Action required: verify your email', 'Your report is ready', 'Login from new device'
];

const SG_TYPES = [
  ...Array(60).fill('delivered'),
  ...Array(15).fill('opened'),
  ...Array(15).fill('clicked'),
  ...Array(5).fill('bounced'),
  ...Array(5).fill('spam')
];

const PM_TYPES = [
  ...Array(65).fill('delivered'),
  ...Array(15).fill('opened'),
  ...Array(12).fill('clicked'),
  ...Array(6).fill('bounced'),
  ...Array(2).fill('spam')
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomId(prefix) {
  return prefix + Math.random().toString(36).slice(2, 10);
}

function randomTimestamp(daysAgoMax = 30) {
  // Higher density in last 7 days
  const daysAgo = Math.random() < 0.5
    ? Math.random() * 7
    : 7 + Math.random() * (daysAgoMax - 7);
  return new Date(Date.now() - daysAgo * 86400000).toISOString();
}

function seedEvents() {
  for (let i = 0; i < 120; i++) {
    events.push({
      id: randomId('evt_'),
      provider: 'sendgrid',
      type: SG_TYPES[i % SG_TYPES.length],
      email: randomItem(EMAILS),
      message_id: randomId('sg_msg_'),
      timestamp: randomTimestamp(),
      metadata: {
        subject: randomItem(SUBJECTS),
        tags: ['transactional']
      }
    });
  }
  for (let i = 0; i < 80; i++) {
    events.push({
      id: randomId('evt_'),
      provider: 'postmark',
      type: PM_TYPES[i % PM_TYPES.length],
      email: randomItem(EMAILS),
      message_id: randomId('pm_msg_'),
      timestamp: randomTimestamp(),
      metadata: {
        subject: randomItem(SUBJECTS),
        tags: ['transactional']
      }
    });
  }
  // Sort newest first
  events.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

seedEvents();

function addEvent(event) {
  events.unshift(event);
}

function queryEvents({ provider, type, email, from, to, limit = 50 } = {}) {
  let result = events;
  if (provider) result = result.filter(e => e.provider === provider);
  if (type) result = result.filter(e => e.type === type);
  if (email) result = result.filter(e => e.email === email);
  if (from) result = result.filter(e => new Date(e.timestamp) >= new Date(from));
  if (to) result = result.filter(e => new Date(e.timestamp) <= new Date(to));
  const capped = Math.min(Number(limit) || 50, 200);
  return { items: result.slice(0, capped), total: result.length };
}

function computeStats({ provider, from, to } = {}) {
  let subset = events;
  if (provider) subset = subset.filter(e => e.provider === provider);
  if (from) subset = subset.filter(e => new Date(e.timestamp) >= new Date(from));
  if (to) subset = subset.filter(e => new Date(e.timestamp) <= new Date(to));

  const count = (type) => subset.filter(e => e.type === type).length;
  const total = subset.length;
  const delivered = count('delivered');
  const bounced = count('bounced');
  const opened = count('opened');
  const clicked = count('clicked');
  const spam = count('spam');

  const pct = (n) => total > 0 ? +((n / total) * 100).toFixed(1) : 0;

  const summary = { total_events: total, delivered, bounced, opened, clicked, spam,
    delivery_rate: pct(delivered), bounce_rate: pct(bounced),
    open_rate: pct(opened), click_rate: pct(clicked) };

  const byProvider = {};
  for (const p of ['sendgrid', 'postmark']) {
    const ps = subset.filter(e => e.provider === p);
    const pt = ps.length;
    const pd = ps.filter(e => e.type === 'delivered').length;
    const pb = ps.filter(e => e.type === 'bounced').length;
    byProvider[p] = {
      total: pt,
      delivery_rate: pt > 0 ? +((pd / pt) * 100).toFixed(1) : 0,
      bounce_rate: pt > 0 ? +((pb / pt) * 100).toFixed(1) : 0
    };
  }

  return { summary, by_provider: byProvider };
}

module.exports = { events, addEvent, queryEvents, computeStats };
