const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');

// GET /api/assets?type=renewable&bbox=w,s,e,n
router.get('/', async (req, res, next) => {
  try {
    const { type, bbox } = req.query;
    const q = {};
    if (type) q.type = type;

    if (bbox) {
      const [w,s,e,n] = bbox.split(',').map(Number);
      q.geometry = { $geoWithin: { $geometry: { type: 'Polygon', coordinates: [[ [w,s],[e,s],[e,n],[w,n],[w,s] ]] } } };
    }

    const docs = await Asset.find(q).lean();
    res.json({ features: docs });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
