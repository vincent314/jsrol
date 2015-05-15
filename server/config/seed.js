/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Event = require('../api/event/event.model');
var Track = require('../api/track/track.model');
var User = require('../api/user/user.model');
var readline = require('readline');
var fs = require('fs');
var _ = require('lodash');
var mongoose = require('mongoose');

User.find({}).remove(function () {
    User.create({
            provider: 'local',
            name: 'Test User',
            email: 'test@test.com',
            password: 'test'
        }, {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'admin'
        }, function () {
            console.log('finished populating users');
        }
    );
});

Event.find({}).remove(function () {
    var events = [];
    var rl = readline.createInterface({
        input: fs.createReadStream('./data/events.json'),
        output: process.stdout
    });
    rl.on('line', function (line) {
        var event = JSON.parse(line);
        delete event._id;
        event.dateTime = new Date(event.dateTime.$date);
        Event.create(event);
    });
});

Track.find({}).remove(function () {
  var tracks = [];
  var rl = readline.createInterface({
    input: fs.createReadStream('./data/tracks.json'),
    output: process.stdout
  });
  rl.on('line', function (line) {
    var track = JSON.parse(line);
      track._id = new mongoose.Types.ObjectId(track._id.$oid);
    Track.create(track);
  });
});
