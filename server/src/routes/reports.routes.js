const express = require('express');
const router = express.Router();
const { exportCSV, exportPDF } = require('../controllers/reports.controller');

router.post('/csv', exportCSV);
router.post('/pdf', exportPDF);

module.exports = router;
