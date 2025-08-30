const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/green_h2_map',
  weights: {
    proximityRenewables: Number(process.env.W_RENEW || 0.4),
    proximityDemand: Number(process.env.W_DEMAND || 0.35),
    proximityTransport: Number(process.env.W_TRANSPORT || 0.15),
    zonePenalty: Number(process.env.W_ZONE_PENALTY || 0.1),
  },
  topK: Number(process.env.TOP_K || 5),
};

module.exports = config;
