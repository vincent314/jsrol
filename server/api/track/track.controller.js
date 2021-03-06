'use strict';

var _ = require('lodash');
var Track = require('./track.model');

// Get list of tracks
exports.index = function (req, res) {
  Track.find(function (err, tracks) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, tracks);
  });
};

// Get a single track
exports.show = function (req, res) {
  Track.findById(req.params.id, function (err, track) {
    if (err) {
      return handleError(res, err);
    }
    if (!track) {
      return res.send(404);
    }
    return res.json(track);
  });
};

// Get kml data
exports.kml = function (req, res) {
  Track.findById(req.params.id, 'kml', function (err, track) {
    if (err) {
      return handleError(res, err);
    }
    if (!track) {
      return res.send(404);
    }
    return res.type('text/plain').send(track.kml);
  });
};

// Creates a new track in the DB.
exports.create = function (req, res) {
  Track.create(req.body, function (err, track) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, track);
  });
};

// Updates an existing track in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Track.findById(req.params.id, function (err, track) {
    if (err) {
      return handleError(res, err);
    }
    if (!track) {
      return res.send(404);
    }
    var updated = _.merge(track, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, track);
    });
  });
};

// Deletes a track from the DB.
exports.destroy = function (req, res) {
  Track.findById(req.params.id, function (err, track) {
    if (err) {
      return handleError(res, err);
    }
    if (!track) {
      return res.send(404);
    }
    track.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
