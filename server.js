'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Static landing page
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/health', require('./routes/health'));
app.use('/providers', require('./routes/providers'));
app.use('/events', require('./routes/events'));
app.use('/stats', require('./routes/stats'));
app.use('/webhooks', require('./routes/webhooks'));
app.use('/docs', require('./routes/docs'));

// Root redirect → landing page already handled by static
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`EmailUnify API v0.1.0 running on port ${PORT}`);
  console.log(`Demo key: eu_demo_key_abc123`);
  console.log(`Docs: http://0.0.0.0:${PORT}/docs`);
});
