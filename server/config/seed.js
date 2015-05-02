/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Event = require('../api/event/event.model');
var Track = require('../api/track/track.model');
var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var readline = require('readline');
var fs = require('fs');
var _ = require('lodash');

Thing.find({}).remove(function () {
    Thing.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
    }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
    }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
    }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
    }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
    });
});

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
    delete track._id;
    Track.create(track);
  });
});
