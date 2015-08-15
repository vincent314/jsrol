'use strict';

var _ = require('lodash');
var Event = require('./event.model');
var Log4js = require('log4js');
var logger = new Log4js.getLogger('Event');

// Get list of events
exports.index = function (req, res) {
    var query = Event.find({});

    if (req.query.sort) {
        query = query.sort(req.query.sort);
    }

    if (req.query.fromDate) {
        query = query.where('dateTime').gte(req.query.fromDate);
    }
    if (req.query.toDate) {
        query = query.where('dateTime').lte(req.query.toDate);
    }
    if (req.query.limit) {
        query = query.limit(Number(req.query.limit));
    }

    query.exec(function (err, events) {
        if (err) {
            return handleError(res, err);
        }

        logger.debug('Got ' + events.length + ' events');
        return res.json(200, events);
    });
};

// Get a single event
exports.show = function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.send(404);
        }
        return res.json(event);
    });
};

// Creates a new event in the DB.
exports.create = function (req, res) {
    Event.create(req.body, function (err, event) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, event);
    });
};

// Updates an existing event in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.send(404);
        }
        var updated = _.merge(event, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, event);
        });
    });
};

// Deletes a event from the DB.
exports.destroy = function (req, res) {
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            return handleError(res, err);
        }
        if (!event) {
            return res.send(404);
        }
        event.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    logger.error(err);
    return res.send(500, err);
}
