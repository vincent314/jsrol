'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
    .get('/', passport.authenticate('google', {
        failureRedirect: '/login?isFailure=true',
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.profile.emails.read'
        ],
        session: false
    }))

    .get('/callback', passport.authenticate('google', {
        failureRedirect: '/login?isFailure=true',
        session: false
    }), auth.setTokenCookie);

module.exports = router;