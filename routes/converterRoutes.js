const express = require('express');
const { convertDocument } = require('../controllers/converterController');

const router = express.Router();

// POST: /api/converter
router.post('/', convertDocument);

module.exports = router;
