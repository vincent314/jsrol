describe('Test auth.service middleware', function () {
    var request = require('supertest');
    var HttpStatus = require('http-status-codes');
    var express = require('express');
    var auth = require('./auth.service');
    var app = new express();
    var User = require('../api/user/user.model');

    app.get('/', auth.isAuthenticated(), function (req, res) {
        res.send(HttpStatus.OK);
    });
    app.get('/admin', auth.isAdmin(), function (req, res) {
        res.send(HttpStatus.OK);
    });

    beforeEach(function (done) {
        User.find({}).remove(function () {
            User.create({
                email: 'admin@test.com',
                isAdmin: true
            }, {
                email: 'user@test.com',
                isAdmin: false
            }, done);
        });
    });

    it('Test isAuthenticated success', function (done) {
        var token = auth.signToken('user@test.com');

        request(app)
            .get('/')
            .set('authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK, done);
    });

    it('Test isAuthenticated, unknown user', function (done) {
        var token = auth.signToken('invalid@email.com');

        request(app)
            .get('/')
            .set('authorization', 'Bearer ' + token)
            .expect(HttpStatus.UNAUTHORIZED, done);
    });

    it('Test isAuthenticated, not authenticated', function (done) {
        request(app)
            .get('/')
            .expect(HttpStatus.UNAUTHORIZED, done);
    });

    it('Test isAdmin success', function (done) {
        var token = auth.signToken('admin@test.com');
        request(app)
            .get('/admin')
            .set('authorization', 'Bearer ' + token)
            .expect(HttpStatus.OK, done)
    });

    it('Test isAdmin failure, not admin', function (done) {
        var token = auth.signToken('user@test.com');
        request(app)
            .get('/admin')
            .set('authorization', 'Bearer ' + token)
            .expect(HttpStatus.FORBIDDEN, done)
    });
});