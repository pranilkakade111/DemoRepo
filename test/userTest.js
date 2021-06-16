const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const userData = require('./userSample.json');

chai.should();
chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYW5pbGtha2FkZTExMUBnbWFpbC5jb20iLCJpZCI6IjYwYmY0N2FjZmJkZTM4MDMyOGI2YWRjNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjIzODQ1ODU0LCJleHAiOjE2MjU5MTk0NTR9.zMv3_eqmTR9A0APkQza2uYx95zpikRWqxpLwfogtc0Y';
const improperToken = 'JhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZGhhbmFuamF5a2FrYWRlODE0QGdtYWlsLmNvbSJ9LCJpYXQiOjE2MjA0MDA4MjMsImV4cCI6MTYyMDQ4NzIyM30.w01svqAFE7cQBw9d2TlvgCrOhC2KpYvuArb7pZoKVdk';

describe('POST /user', () => {
  it('given_admin_with_ProperData_Should_register', (done) => {
    chai
      .request(server)
      .post('/admin')
      .send(userData.AdminRegistration)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('given_user_with_ProperData_Should_register', (done) => {
    chai
      .request(server)
      .post('/user')
      .send(userData.userRegistration)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('given_admin_with_improperData_Should_not_register', (done) => {
    chai
      .request(server)
      .post('/admin')
      .send(userData.adminRegistration_With_Improper_Details)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('given_user_with_improperData_Should_not_register', (done) => {
    chai
      .request(server)
      .post('/user')
      .send(userData.userRegistration_With_Improper_Details)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('POST /userLogin /adminLogin', () => {
  it.only('given_admin_with_ProperData_should_login', (done) => {
    chai
      .request(server)
      .post('/adminLogin')
      .send(userData.adminLogin)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it.only('given_user_with_ProperData_should_login', (done) => {
    chai
      .request(server)
      .post('/userLogin')
      .send(userData.userLogin)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it.only('given_admin_with_ImproperData_should _not_Login', (done) => {
    chai
      .request(server)
      .post('/adminLogin')
      .send(userData.adminLogin_with_Improper_Details)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it.only('given_user_with_ImproperData_should _not_Login', (done) => {
    chai
      .request(server)
      .post('/userLogin')
      .send(userData.userLogin_with_Improper_Details)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('POST /forgotPassword', () => {
  it.only('givenUser_with_ProperData_Should_Send_ResetLink_Over_EmailId', (done) => {
    chai
      .request(server)
      .post('/forgotPassword')
      .send(userData.forgotPassword)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it.only('givenUser_with_ImproperEndPoint_Should_Not_Send_ResetLink_Over_EmailId', (done) => {
    chai
      .request(server)
      .post('/forgotPasswo')
      .send(userData.forgotPassword)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('POST /resetPassword', () => {
  it.only('givenUser_with_Propertoken_Should_ResetPassword', (done) => {
    chai.request(server)
      .post('/resetPassword')
      .set('token', `${token}`)
      .send(userData.resetPassword_with_proper_token)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it.only('givenUser_with_ImPropertoken_Should_Not_ResetPassword', (done) => {
    chai.request(server)
      .post('/resetPassword')
      .set('token', `${improperToken}`)
      .send(userData.resetPassword_with_proper_token)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
