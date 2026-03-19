'use strict';

const router = require('express').Router();
const auth = require('../middleware/auth');
const { queryEvents } = require('../store/events');

router.get('/', auth, (req, res) => {
  const { provider, type, email, from, to, limit } = req.query;
  const { items, total } = queryEvents({ provider, type, email, from, to, limit });
  res.json({
    events: items,
    total,
    page_info: { has_more: total > items.length }
  });
});

module.exports = router;
