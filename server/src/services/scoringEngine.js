// scoring engine: uses turf to compute distances and a weighted score
const turf = require('@turf/turf');
const config = require('../config/env');

// helper: compute min distance in meters between point and array of GeoJSON features
function minDistanceMeters(pointFeature, features) {
  if (!features || features.length === 0) return 1e7;
  const dists = features.map(f => {
    const geom = f.geometry;
    if (!geom) return 1e7;
    const feat = turf.feature(geom);
    // turf.distance returns kilometers by default if units set => we'll use kilometers then *1000
    try {
      const kilometers = turf.distance(pointFeature, feat, { units: 'kilometers' });
      return kilometers * 1000;
    } catch (err) {
      // fallback: large number
      return 1e7;
    }
  });
  return Math.min(...dists);
}

function invDistanceScore(distanceMeters, cap = 200000) {
  const d = Math.min(distanceMeters, cap);
  return 1 - d / cap;
}

function scoreCandidate(candidate, ctx) {
  // candidate: {lng, lat}
  const p = turf.point([candidate.lng, candidate.lat]);

  const dRenew = minDistanceMeters(p, ctx.renewables || []);
  const dDemand = minDistanceMeters(p, ctx.demand || []);

  // pipelines might be LineStrings: compute shortest distance to line
  let dPipe = 1e7;
  if (ctx.pipelines && ctx.pipelines.length) {
    const pipeDists = ctx.pipelines.map(pl => {
      try {
        const line = turf.lineString(pl.geometry.coordinates);
        const snapped = turf.nearestPointOnLine(line, p, { units: 'kilometers' });
        // snapped.properties contains 'dist' only in certain versions; compute explicit
        const meters = turf.distance(p, snapped, { units: 'kilometers' }) * 1000;
        return meters;
      } catch (e) {
        return 1e7;
      }
    });
    dPipe = Math.min(...pipeDists);
  }

  const inBadZone = (ctx.zones && ctx.zones.length > 0);
  const zonePenalty = inBadZone ? config.weights.zonePenalty : 0;

  const scoreRaw =
    config.weights.proximityRenewables * invDistanceScore(dRenew) +
    config.weights.proximityDemand * invDistanceScore(dDemand) +
    config.weights.proximityTransport * invDistanceScore(dPipe) -
    zonePenalty;

  const score = Math.max(0, Math.min(1, scoreRaw));

  return {
    score,
    breakdown: {
      renewables: invDistanceScore(dRenew),
      demand: invDistanceScore(dDemand),
      transport: invDistanceScore(dPipe),
      zonePenalty
    }
  };
}

module.exports = { scoreCandidate };
