const request = require("supertest");
const app = require('../../server/app');
const expect = require('chai').expect;

describe('The server', function(){

  let server;

  before(function(done){
    server = app.listen(done)
  })

  after(function(done){
    if (!server) {
      console.log('No server ----------')
      return done(); }
    server.close(done);
  });

  it("should get json from /test", function (done) {
      request(app)
        .get("/test")
        .expect(200)
        .end(done);
    });

});