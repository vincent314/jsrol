'use strict';

var should = require('should');
var expect = require('chai').expect;
var app = require('../../app');
var request = require('supertest');
var Track = require('./track.model');
var Q = require('q');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

describe('GET /api/tracks', function () {

  before(function (done) {
    //   Clear users before testing
    Track.remove().exec().then(function () {
      done();
    });
  });

  afterEach(function (done) {
    Track.remove().exec().then(function () {
      done();
    });
  });

  it('should respond with JSON array', function (done) {
    request(app)
      .get('/api/tracks')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should save a track', function (done) {
    var track = new Track({
      kml: '<kml></kml>',
      gpx: '<gpx></gpx>',
      name: "ROL Friday Night 2",
      type: "LRFN",
      distance: 6.809999942779541
    });

    Q.ninvoke(track, 'save').then(function (track) {
      should.exist(track);
      var id = track[0].id;
      console.log('Finding by id : ' + id);
      return Track.findById(id).exec();
    }).then(function (track) {
      should.exist(track);
      track.name.should.equal('ROL Friday Night 2');
      done();
    }).catch(function (err) {
      done(err);
    });
  });

  it('should get kml data', function (done) {
    var track = new Track({
      kml: '<kml></kml>',
      gpx: '<gpx></gpx>',
      name: "ROL Friday Night 2",
      type: "LRFN",
      distance: 6.809999942779541
    });

    Q.ninvoke(track, 'save').then(function (t) {
      var id = t[0].id;
      request(app)
        .get('/api/tracks/' + id + '/kml')
        .expect('Content-Type', /text\/plain/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(err);
          } else {
            res.text.should.be.equal('<kml></kml>');
            done();
          }
        });
    });
  });

  describe('Test with inserted data', function () {
    beforeEach(function (done) {
      var tracks = [
        new Track({
          kml: '<kml></kml>',
          gpx: '<gpx></gpx>',
          name: "ROL Friday Night 2",
          type: "LRFN",
          distance: 6.809999942779541
        }),
        new Track({
          kml: '<kml></kml>',
          gpx: '<gpx></gpx>',
          name: "ROL Balade familiale 1",
          type: "ROL_PARADE",
          distance: 9.99999999
        })
      ];

      Track.create(tracks).then(function() {
        done();
      });
    });

    it('should list tracks without kml nor gpx', function (done) {
      request(app)
        .get('/api/tracks')
        .expect(200)
        .end(function (err, res) {
          var tracks = res.body;
          expect(tracks.length).to.equal(2);
          var track = tracks[0];
          //TODO
          expect(track.name).to.equal('ROL Friday Night 2');
          expect(track.gpx).to.be.undefined;
          expect(track.kml).to.be.undefined;
          done();
        });
    })
  });

});
