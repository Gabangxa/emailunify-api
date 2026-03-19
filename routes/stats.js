'use strict';

const router = require('express').Router();
const auth = require('../middleware/auth');
const { computeStats } = require('../store/events');

router.get('/', auth, (req, res) => {
  const { provider } = req.query;
  const to = req.query.to || new Date().toISOString();
  const from = req.query.from || new Date(Date.now() - 7 * 86400000).toISOString();

  const { summary, by_provider } = computeStats({ provider, from, to });

  res.json({
    period: { from, to },
    summary,
    by_provider
  });
});

module.exports = router;
