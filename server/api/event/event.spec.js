'use strict';

var expect = require('chai').expect;
var app = require('../../app');
var request = require('supertest');
var Event = require('./event.model');

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
});