'use strict';

var expect = require('chai').expect;
var app = require('../../app');
var request = require('supertest');
var Event = require('./event.model');
var Q = require('q');
var _ = require('lodash');
var Log4js = require('log4js');
var logger = Log4js.getLogger('EventSpec');

describe('GET /api/events', function () {

    before(function (done) {
        //   Clear users before testing
        Event.remove().exec().then(function () {
            done();
        });
    });

    afterEach(function (done) {
        Event.remove().exec().then(function () {
            done();
        });
    });

    it('should insert an event', function (done) {
        var event = new Event({
            "feedId": "http://www.google.com/calendar/feeds/94u7im1kq3ck9mn2j12vd8sc5k%40group.calendar.google.com/public/full/itm5vhdfeniokk8gceg113tkn0",
            "name": "ROL Parade",
            "dateTime": "2013-07-07T00:00:00.000Z",
            "type": "ROL_PARADE",
            "loop1": "5193f31b84ae096d60cb91c8",
            "loop2": "5193f31c84ae096d60cb91cc",
            "description": "1e boucle : Lille\n2e boucle : Lille, Loos"
        });

        event.save(function (err, event) {
            if (err) {
                expect(err).to.not.exist;
            } else {
                expect(event).to.exist;
                expect(event.dateTime.toString()).to.equal('Sun Jul 07 2013 02:00:00 GMT+0200 (CEST)');
                done();
            }
        });
    });

    /*
     it('should respond with JSON array', function(done) {
     request(app)
     .get('/api/events')
     .expect(200)
     .expect('Content-Type', /json/)
     .end(function(err, res) {
     if (err) return done(err);
     res.body.should.be.instanceof(Array);
     done();
     });
     });
     */

    describe('should find events in future and in the past', function () {
        var promise;

        before(function (done) {
            //   Clear users before testing
            Event.remove().exec().then(function () {
                done();
            });
        });

        beforeEach(function () {
            var events = [new Event({
                "name": "Event2",
                "dateTime": "2015-01-01T00:00:00.000Z"
            }), new Event({
                "name": "Event1",
                "dateTime": "2014-01-01T00:00:00.000Z"
            })];

            var promises = _(events).map(function (event) {
                return Q.ninvoke(event, 'save');
            }).value();

            promise = Q.all(promises);
        });

        it('should find events in the future', function (done) {
            promise.then(function (results) {
                expect(results.length).to.equal(2);
                var r = request(app)
                    .get('/api/events?fromDate=2014-06-01T00:00:00')
                    .expect(200)
                    .expect('Content-Type', /json/);
                return Q.ninvoke(r, 'end');
            }).then(function (res) {
                res.body.should.be.instanceof(Array);
                res.body.length.should.equal(1);
                res.body[0].name.should.equal('Event2');
                done();
            }).catch(function (err) {
                logger.error(err);
                done(err);
            });
        });

        it('should find events in the past', function (done) {
            promise.then(function (results) {
                expect(results.length).to.equal(2);
                var r = request(app)
                    .get('/api/events?toDate=2014-06-01T00:00:00')
                    .expect(200)
                    .expect('Content-Type', /json/);
                return Q.ninvoke(r, 'end');
            }).then(function (res) {
                res.body.should.be.instanceof(Array);
                res.body.length.should.equal(1);
                res.body[0].name.should.equal('Event1');
                done();
            }).catch(function (err) {
                logger.error(err);
                done(err);
            });
        });
        it('should find all events sorted by date', function (done) {
            promise.then(function (results) {
                expect(results.length).to.equal(2);
                var r = request(app)
                    .get('/api/events')
                    .query({sort: 'dateTime'})
                    .expect(200)
                    .expect('Content-Type', /json/);
                return Q.ninvoke(r, 'end');
            }).then(function (res) {
                res.body.should.be.instanceof(Array);
                res.body.length.should.equal(2);
                res.body[0].name.should.equal('Event1');
                res.body[1].name.should.equal('Event2');
                done();
            }).catch(function (err) {
                logger.error(err);
                done(err);
            });
        });
    });
});
