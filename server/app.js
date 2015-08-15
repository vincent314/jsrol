/**
 * Main application file
 *
 */
/* global exports */
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var cors = require('cors');
var Log4js = require('log4js');
var logger = new Log4js.getLogger('app');

// Connect to database
logger.debug('mongo uri = ' + config.mongo.uri);
mongoose.connect(config.mongo.uri, config.mongo.options);

// Debug Mongoose
mongoose.set('debug', true);

// Populate DB with sample data
if (config.seedDB) {
    require('./config/seed');
}

// Setup server
var app = express();
app.use(cors());
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
module.exports = app;
