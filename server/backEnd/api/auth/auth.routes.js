// backEnd/api/auth/auth.routes.js

const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Auth route working!' });
});

module.exports = router;
