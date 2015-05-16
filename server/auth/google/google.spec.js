describe.skip('Test google', function () {
    var request = require('supertest');
    var app = require('../../app');
    var passportStub = require('passport-stub');
    var HttpStatus = require('http-status-codes');
    passportStub.install(app);

    it('Should call callback', function (done) {
        passportStub.login({email:'admin@test.com',isAdmin:true});
        request(app)
            .get('/auth/google/callback?code=4/yCY5JK5Ns4w-bRAKPYECaSCtYrGLIcp2rq0Yv6TVLXk.stnbmNpO-3waoiIBeO6P2m9SPuyvmgI')
            .expect(200, done);
    });
});