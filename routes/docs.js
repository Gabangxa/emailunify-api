'use strict';

const router = require('express').Router();

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>EmailUnify API Docs</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',sans-serif;background:#f8f9fa;color:#1a1a2e;display:flex;min-height:100vh}
  nav{width:240px;background:#1a1a2e;color:#e8e8f0;padding:24px 0;position:fixed;top:0;left:0;height:100vh;overflow-y:auto}
  nav .logo{padding:0 20px 24px;font-size:18px;font-weight:600;color:#fff;border-bottom:1px solid #2d2d4e}
  nav .logo span{color:#4f8ef7}
  nav ul{list-style:none;padding:16px 0}
  nav ul li a{display:block;padding:8px 20px;color:#9090b8;text-decoration:none;font-size:13px;transition:all .15s}
  nav ul li a:hover,nav ul li a.active{color:#fff;background:#2d2d4e;border-left:3px solid #4f8ef7;padding-left:17px}
  nav .section-label{padding:12px 20px 4px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#5050a0}
  main{margin-left:240px;flex:1;padding:40px}
  .page-title{font-size:28px;font-weight:600;margin-bottom:8px}
  .subtitle{color:#666;margin-bottom:32px}
  .badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:600;font-family:'JetBrains Mono',monospace;margin-right:8px}
  .badge.get{background:#d1fae5;color:#065f46}
  .badge.post{background:#dbeafe;color:#1e40af}
  .endpoint{background:#fff;border:1px solid #e5e7eb;border-radius:10px;margin-bottom:24px;overflow:hidden}
  .endpoint-header{padding:16px 20px;display:flex;align-items:center;gap:12px;border-bottom:1px solid #f3f4f6}
  .endpoint-path{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:500}
  .endpoint-desc{color:#666;font-size:13px;margin-left:auto}
  .endpoint-body{padding:20px}
  .param-table{width:100%;border-collapse:collapse;font-size:13px;margin-top:8px}
  .param-table th{text-align:left;padding:8px 12px;background:#f9fafb;border-bottom:2px solid #e5e7eb;font-weight:600;color:#374151}
  .param-table td{padding:8px 12px;border-bottom:1px solid #f3f4f6;vertical-align:top}
  .param-table td:first-child{font-family:'JetBrains Mono',monospace;color:#1a1a2e;font-size:12px}
  .param-table td:nth-child(2){color:#7c3aed;font-family:'JetBrains Mono',monospace;font-size:12px}
  .code-block{background:#1a1a2e;color:#e8e8f0;border-radius:8px;padding:16px;font-family:'JetBrains Mono',monospace;font-size:13px;overflow-x:auto;margin-top:12px;line-height:1.6}
  .code-block .comment{color:#6272a4}
  .code-block .string{color:#f1fa8c}
  .code-block .key{color:#8be9fd}
  .code-block .number{color:#bd93f9}
  .section-title{font-size:16px;font-weight:600;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #e5e7eb}
  .quickstart{background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:24px;margin-bottom:32px}
  .step{display:flex;gap:12px;margin-bottom:16px;align-items:flex-start}
  .step-num{width:28px;height:28px;background:#4f8ef7;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;flex-shrink:0}
  .note{background:#eff6ff;border-left:4px solid #4f8ef7;padding:12px 16px;border-radius:0 6px 6px 0;font-size:13px;margin-top:16px}
  h2{font-size:22px;font-weight:600;margin:32px 0 16px}
</style>
</head>
<body>
<nav>
  <div class="logo">Email<span>Unify</span> API</div>
  <ul>
    <li class="section-label">Getting Started</li>
    <li><a href="#quickstart">Quick Start</a></li>
    <li><a href="#auth">Authentication</a></li>
    <li class="section-label">Endpoints</li>
    <li><a href="#health">GET /health</a></li>
    <li><a href="#providers">POST /providers</a></li>
    <li><a href="#list-providers">GET /providers</a></li>
    <li><a href="#events">GET /events</a></li>
    <li><a href="#stats">GET /stats</a></li>
    <li><a href="#webhooks">POST /webhooks/inbound/:provider</a></li>
  </ul>
</nav>
<main>
  <div class="page-title">EmailUnify API Reference</div>
  <p class="subtitle">Unified transactional email analytics across SendGrid, Postmark, and more. v0.1.0</p>

  <div id="quickstart" class="quickstart">
    <div class="section-title">Quick Start — 3 commands to get stats</div>
    <div class="step">
      <div class="step-num">1</div>
      <div>
        <strong>Register a provider (demo mode)</strong>
        <div class="code-block">curl -X POST https://emailunify-api.repl.co/providers \\<br>
  -H "X-API-Key: eu_demo_key_abc123" \\<br>
  -H "Content-Type: application/json" \\<br>
  -d '{"provider":"sendgrid","api_key":"DEMO_sg_test"}'</div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">2</div>
      <div>
        <strong>Fetch recent events</strong>
        <div class="code-block">curl "https://emailunify-api.repl.co/events?limit=10" \\<br>
  -H "X-API-Key: eu_demo_key_abc123"</div>
      </div>
    </div>
    <div class="step">
      <div class="step-num">3</div>
      <div>
        <strong>Get aggregate stats</strong>
        <div class="code-block">curl "https://emailunify-api.repl.co/stats" \\<br>
  -H "X-API-Key: eu_demo_key_abc123"</div>
      </div>
    </div>
    <div class="note"><strong>Demo key:</strong> <code>eu_demo_key_abc123</code> — works without registration. Seed data from both providers is pre-loaded.</div>
  </div>

  <div id="auth">
    <h2>Authentication</h2>
    <p>Pass your API key via either header:</p>
    <div class="code-block">X-API-Key: eu_demo_key_abc123<br><span class="comment"># or</span><br>Authorization: Bearer eu_demo_key_abc123</div>
    <p style="margin-top:12px;font-size:13px;color:#666">All keys must start with <code>eu_</code>. The demo key <code>eu_demo_key_abc123</code> is always valid.</p>
  </div>

  <h2>Endpoints</h2>

  <div id="health" class="endpoint">
    <div class="endpoint-header">
      <span class="badge get">GET</span>
      <span class="endpoint-path">/health</span>
      <span class="endpoint-desc">Service health check</span>
    </div>
    <div class="endpoint-body">
      <div class="section-title">Response</div>
      <div class="code-block">{"status":"ok","version":"0.1.0","uptime":3600}</div>
    </div>
  </div>

  <div id="providers" class="endpoint">
    <div class="endpoint-header">
      <span class="badge post">POST</span>
      <span class="endpoint-path">/providers</span>
      <span class="endpoint-desc">Register a new email provider</span>
    </div>
    <div class="endpoint-body">
      <div class="section-title">Request Body</div>
      <table class="param-table">
        <tr><th>Field</th><th>Type</th><th>Description</th></tr>
        <tr><td>provider</td><td>string</td><td>One of: <code>sendgrid</code>, <code>postmark</code></td></tr>
        <tr><td>api_key</td><td>string</td><td>Provider API key. Use <code>DEMO_*</code> prefix for mock data.</td></tr>
      </table>
      <div class="section-title" style="margin-top:16px">Response</div>
      <div class="code-block">{"id":"prov_abc123","provider":"sendgrid","status":"connected","events_fetched":20}</div>
    </div>
  </div>

  <div id="list-providers" class="endpoint">
    <div class="endpoint-header">
      <span class="badge get">GET</span>
      <span class="endpoint-path">/providers</span>
      <span class="endpoint-desc">List registered providers</span>
    </div>
    <div class="endpoint-body">
      <div class="section-title">Response</div>
      <div class="code-block">{"providers":[{"id":"prov_abc123","provider":"sendgrid","status":"connected","last_synced":"2026-03-19T16:00:00Z"}]}</div>
    </div>
  </div>

  <div id="events" class="endpoint">
    <div class="endpoint-header">
      <span class="badge get">GET</span>
      <span class="endpoint-path">/events</span>
      <span class="endpoint-desc">Query normalized email events</span>
    </div>
    <div class="endpoint-body">
      <div class="section-title">Query Parameters</div>
      <table class="param-table">
        <tr><th>Param</th><th>Type</th><th>Description</th></tr>
        <tr><td>provider</td><td>string?</td><td>Filter by provider (<code>sendgrid</code> | <code>postmark</code>)</td></tr>
        <tr><td>type</td><td>string?</td><td>Filter by event type (<code>delivered</code> | <code>bounced</code> | <code>opened</code> | <code>clicked</code> | <code>spam</code>)</td></tr>
        <tr><td>email</td><td>string?</td><td>Filter by recipient email</td></tr>
        <tr><td>from</td><td>ISO date?</td><td>Start of date range</td></tr>
        <tr><td>to</td><td>ISO date?</td><td>End of date range</td></tr>
        <tr><td>limit</td><td>number?</td><td>Max results, default 50, max 200</td></tr>
      </table>
      <div class="section-title" style="margin-top:16px">Response</div>
      <div class="code-block">{"events":[{"id":"evt_x1y2z3","provider":"sendgrid","type":"delivered","email":"alice@acme.com","message_id":"sg_msg_abc","timestamp":"2026-03-19T10:00:00Z","metadata":{"subject":"Welcome to the platform","tags":["transactional"]}}],"total":200,"page_info":{"has_more":true}}</div>
    </div>
  </div>

  <div id="stats" class="endpoint">
    <div class="endpoint-header">
      <span class="badge get">GET</span>
      <span class="endpoint-path">/stats</span>
      <span class="endpoint-desc">Aggregate delivery statistics</span>
    </div>
    <div class="endpoint-body">
      <div class="section-title">Query Parameters</div>
      <table class="param-table">
        <tr><th>Param</th><th>Type</th><th>Description</th></tr>
        <tr><td>provider</td><td>string?</td><td>Filter to one provider</td></tr>
        <tr><td>from</td><td>ISO date?</td><td>Start date (default: 7 days ago)</td></tr>
        <tr><td>to</td><td>ISO date?</td><td>End date (default: now)</td></tr>
      </table>
      <div class="section-title" style="margin-top:16px">Response</div>
      <div class="code-block">{"period":{"from":"...","to":"..."},"summary":{"total_events":200,"delivered":140,"bounced":12,"opened":30,"clicked":14,"spam":4,"delivery_rate":70.0,"bounce_rate":6.0,"open_rate":15.0,"click_rate":7.0},"by_provider":{"sendgrid":{"total":120,"delivery_rate":68.0,"bounce_rate":5.0},"postmark":{"total":80,"delivery_rate":73.0,"bounce_rate":7.5}}}</div>
    </div>
  </div>

  <div id="webhooks" class="endpoint">
    <div class="endpoint-header">
      <span class="badge post">POST</span>
      <span class="endpoint-path">/webhooks/inbound/:provider</span>
      <span class="endpoint-desc">Receive raw provider webhooks</span>
    </div>
    <div class="endpoint-body">
      <div class="section-title">URL Parameters</div>
      <table class="param-table">
        <tr><th>Param</th><th>Type</th><th>Description</th></tr>
        <tr><td>:provider</td><td>string</td><td><code>sendgrid</code> or <code>postmark</code></td></tr>
      </table>
      <div class="section-title" style="margin-top:16px">Request Body</div>
      <p style="font-size:13px;color:#666;margin-bottom:8px">Raw provider webhook payload (JSON object or array). No auth required for webhook ingestion.</p>
      <div class="section-title" style="margin-top:16px">Response</div>
      <div class="code-block">{"status":"ok","events_ingested":1}</div>
    </div>
  </div>
</main>
</body>
</html>`;

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(HTML);
});

module.exports = router;
