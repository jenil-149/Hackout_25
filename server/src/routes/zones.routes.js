const express = require('express');
const router = express.Router();
const Zone = require('../models/Zone');

// GET /api/zones?bbox=w,s,e,n
router.get('/', async (req, res, next) => {
  try {
    const { bbox } = req.query;
    const q = {};
    if (bbox) {
      const [w,s,e,n] = bbox.split(',').map(Number);
      q.geometry = { $geoWithin: { $geometry: { type: 'Polygon', coordinates: [[ [w,s],[e,s],[e,n],[w,n],[w,s] ]] } } };
    }
    const zones = await Zone.find(q).lean();
    res.json({ features: zones });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
