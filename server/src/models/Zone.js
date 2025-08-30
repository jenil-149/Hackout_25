const mongoose = require('mongoose');

const ZoneSchema = new mongoose.Schema({
  name: String,
  kind: { type: String, enum: ['protected', 'regulatory', 'other'], default: 'other' },
  geometry: {
    type: { type: String, enum: ['Polygon', 'MultiPolygon'], required: true },
    coordinates: { type: Array, required: true }
  }
}, { timestamps: true });

ZoneSchema.index({ geometry: '2dsphere' });

module.exports = require('mongoose').model('Zone', ZoneSchema);
