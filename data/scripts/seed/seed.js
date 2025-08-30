// data/scripts/seed.js
require('dotenv').config({ path: '../../server/.env' }); // optional
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Asset = require('../../server/src/models/Asset');
const Zone = require('../../../server/src/models/Zone');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/green_h2_map';

async function loadGeojson(relPath) {
  const p = path.join(__dirname, '..', 'seed', relPath);
  const txt = fs.readFileSync(p, 'utf-8');
  return JSON.parse(txt);
}

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to', MONGO_URI);

  await Asset.deleteMany({});
  await Zone.deleteMany({});

  const types = [
    ['plants.geojson', 'plant'],
    ['renewables.geojson', 'renewable'],
    ['demand_centers.geojson', 'demand'],
    ['pipelines.geojson', 'pipeline']
  ];

  for (const [file, type] of types) {
    const fc = await loadGeojson(file);
    if (!fc || !fc.features) continue;
    for (const f of fc.features) {
      await Asset.create({
        type,
        name: f.properties?.name || '',
        properties: f.properties || {},
        geometry: f.geometry
      });
    }
    console.log('Imported', type);
  }

  const zonesFc = await loadGeojson('zones.geojson');
  if (zonesFc && zonesFc.features) {
    for (const f of zonesFc.features) {
      await Zone.create({
        name: f.properties?.name || '',
        kind: f.properties?.kind || 'other',
        geometry: f.geometry
      });
    }
    console.log('Imported zones');
  }

  console.log('Seeding complete.');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
