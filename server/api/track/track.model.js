'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TrackSchema = new Schema({
  name: String,
  kml: String,
  gpx: String,
  type: String,
  distance: Number
});

module.exports = mongoose.model('Track', TrackSchema);
