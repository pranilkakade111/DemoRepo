const { expect } = require('chai');
const chai = require('chai');
const request = require('supertest');
const chaiHttp = require('chai-http');
const server = require('../server');
const bookData = require('./bookSample.json');

chai.should();
chai.use(chaiHttp);

const adminToken = bookData.books.ProperAdminToken;
const usertoken = bookData.books.userToken;

// const userCredential = {
//   email: 'pranilkakade2@gmail.com',
//   password: '1111',
// };

const authenticatedUser = request.agent(server);

describe('POST /books', () => {
  before((done) => {
    authenticatedUser
      .post('/login')
      .send(bookData.books.userLogin)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return res.should.have.status(200);
      });
    done();
  });
  it('givenBookDetails_When_Proper_Should_Be_Able_To_Create_Book', (done) => {
    authenticatedUser
      .post('/books')
      .send(bookData.books.createBook)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return res.should.have.status(200);
      });
    done();
  });

  it('givenBookDetails_When_Give_UserToken_Should_Not_Be_Able_To_Create_Book', (done) => {
    chai
      .request(server)
      .post('/books')
      .set('token', +usertoken)
      .send(bookData.books.createBook)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return res.should.have.status(401);
      });
    done();
  });
});

describe('/GET, /books', () => {
  before((done) => {
    authenticatedUser
      .post('/login')
      .send(bookData.books.userLogin)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return res.should.have.status(200);
      });
    done();
  });
  it.only('Given_Books_When_ProperEndPoint_Should_Return', (done) => {
    authenticatedUser
      .get('/books')
      .send()
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return res.should.have.status(200);
      });
    done();
  });

  it.only('Given_Books_When_ImProperEndPoint_Should_Return', (done) => {
    authenticatedUser
      .get('/booksData')
      .send()
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return res.should.have.status(404);
      });
    done();
  });
});

describe('DELETE, /books/:bookId', () => {
  beforeEach((done) => {
    authenticatedUser
      .post('/login')
      .send(bookData.books.userLogin)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return res.should.have.status(200);
      });
    done();
  });
  it('givenBook_When_ProperBookId_Should Delete', () => {
    authenticatedUser
    .delete('/books/60c439ec708e64331073fe7b')
    .
  });
});
