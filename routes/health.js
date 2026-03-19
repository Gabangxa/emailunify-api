'use strict';

const router = require('express').Router();
const START_TIME = Date.now();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    version: '0.1.0',
    uptime: Math.floor((Date.now() - START_TIME) / 1000)
  });
});

module.exports = router;
