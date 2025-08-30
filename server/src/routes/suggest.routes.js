const express = require('express');
const router = express.Router();
const { suggest } = require('../controllers/suggest.controller');

router.get('/', suggest); // GET /api/suggest?lng=&lat=  or ?bbox=w,s,e,n

module.exports = router;
