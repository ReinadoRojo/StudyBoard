const server = require('./server');
const db = require('./lib/db');
const config = require('./config');
const logger = require('./lib/logger');

server.start(config.port);