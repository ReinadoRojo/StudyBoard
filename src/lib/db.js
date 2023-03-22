const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../lib/logger');

mongoose.connect(config.mongoURI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => {
  logger.info('Connected to MongoDB');
}).catch(err => {
  logger.error('Could not connect to MongoDB');
  logger.error(err);
})