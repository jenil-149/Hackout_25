// helper: run geospatial queries against Mongo
const Asset = require('../models/Asset');
const Zone = require('../models/Zone');

async function findNearby(point, maxMeters = 200000) {
  // point = [lng, lat]
  const nearQuery = {
    geometry: {
      $near: {
        $geometry: { type: 'Point', coordinates: point },
        $maxDistance: maxMeters
      }
    }
  };

  const [renewables, demand, pipelines] = await Promise.all([
    Asset.find({ ...nearQuery, type: 'renewable' }).lean(),
    Asset.find({ ...nearQuery, type: 'demand' }).lean(),
    Asset.find({ ...nearQuery, type: 'pipeline' }).lean()
  ]);

  const zones = await Zone.find({
    geometry: { $geoIntersects: { $geometry: { type: 'Point', coordinates: point } } }
  }).lean();

  return { renewables, demand, pipelines, zones };
}

module.exports = { findNearby };
