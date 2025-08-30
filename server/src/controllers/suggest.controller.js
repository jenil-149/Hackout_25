const turf = require('@turf/turf');
const { findNearby } = require('../services/geoQuery');
const { scoreCandidate } = require('../services/scoringEngine');
const config = require('../config/env');

async function suggest(req, res, next) {
  try {
    const { lng, lat, bbox } = req.query;

    let candidates = [];

    if (bbox) {
      // expected format "w,s,e,n"
      const arr = bbox.split(',').map(Number);
      if (arr.length !== 4) return res.status(400).json({ error: 'bbox must be w,s,e,n' });
      const [w, s, e, n] = arr;
      // make a grid — coarse points
      const bboxPoly = turf.bboxPolygon([w, s, e, n]);
      const cellSizeKm = 10; // coarse grid spacing (km)
      const grid = turf.pointGrid([w, s, e, n], cellSizeKm, { units: 'kilometers' });
      candidates = grid.features.map(f => ({ lng: f.geometry.coordinates[0], lat: f.geometry.coordinates[1] }));
    } else if (lng && lat) {
      const cx = Number(lng), cy = Number(lat);
      const center = turf.point([cx, cy]);
      const circle = turf.circle(center, 20, { units: 'kilometers', steps: 32 });
      const bboxC = turf.bbox(circle);
      const grid = turf.pointGrid(bboxC, 5, { units: 'kilometers' });
      candidates = grid.features.map(f => ({ lng: f.geometry.coordinates[0], lat: f.geometry.coordinates[1] }));
    } else {
      return res.status(400).json({ error: 'Provide ?lng=&lat= or ?bbox=w,s,e,n' });
    }

    // score candidates in parallel (limit for production)
    const scored = [];
    for (const c of candidates) {
      const nearby = await findNearby([c.lng, c.lat], 200000); // 200 km window
      const sc = scoreCandidate(c, nearby);
      scored.push(Object.assign({}, c, sc));
    }

    const top = scored.sort((a, b) => b.score - a.score).slice(0, config.topK);

    res.json({ top });
  } catch (err) {
    next(err);
  }
}

module.exports = { suggest };
