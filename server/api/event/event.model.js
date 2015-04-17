'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
    name: String,
    feedId: String,
    dateTime:Date,
    type: String,
    loop1: String,
    loop2: String,
    description: String
});

module.exports = mongoose.model('Event', EventSchema);