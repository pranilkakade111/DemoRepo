const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const userData = require('./userSample.json');

chai.should();
chai.use(chaiHttp);

describe('POST /user', () => {
  it('given_user_with_ProperData_Should_register', (done) => {
    chai
      .request(server)
      .post('/user')
      .send(userData.userRegistration)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
      });
    done();
  });

  it('given_user_with_improperData_Should_not_register', (done) => {
    chai
      .request(server)
      .post('/user')
      .send(userData.userRegistration_With_Improper_Details)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(400);
      });
    done();
  });
});

describe('POST /userLogin', () => {
  it('given_user_with_ProperData_should_login', (done) => {
    chai
      .request(server)
      .post('/userLogin')
      .send(userData.userLogin)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
      });
    done();
  });

  it('given_user_with_ImproperData_should _not_Login', (done) => {
    chai
      .request(server)
      .post('/userLogin')
      .send(userData.userLogin_with_Improper_Details)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(401);
      });
    done();
  });
});
