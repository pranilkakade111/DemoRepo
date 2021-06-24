const chai = require('chai');
const request = require('supertest');
const chaiHttp = require('chai-http');
const server = require('../server');
const cartData = require('./cartSample.json');

chai.should();
chai.use(chaiHttp);

const adminToken = 'eyJhbGciOiJIUzI1NiI5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYW5pbGtha2FkZTJAZ21haWwuY29tIiwiaWQiOiI2MGJmNDc2Y2ZiZGUzODAzMjhiNmFkYzQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjQ1MDU3MjgsImV4cCI6MTYyNjU3OTMyOH0.Um_Ie6brBPLWTp2J6ebrdmyu1-76QHdfyrdTshJmr74';
const usertoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpY2tleWtha2FkZUBnbWFpbC5jb20iLCJpZCI6IjYwYzBhNGFmMGE5YmM0MTdkY2JiOTJiZiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjI0NDgxMzMyLCJleHAiOjE2MjY1NTQ5MzJ9.G45UE0Jk4UPBLx7WOn37OOIHb9UTPuNuCKSLCvQ70r4';

describe('PUT /addToCart', () => {
  it('When_It_Give_ProperDetails_It_Should_Be_Add_To_Cart_Successfully', (done) => {
    chai.request(server)
      .put('/addToCart')
      .set('token', usertoken)
      .send(cartData.addToCartWithProperDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('When_It_Give_ProperDetails_With_WrongToken_It_Should_Not_Be_Add_In_Cart_Successfully', (done) => {
    chai.request(server)
      .put('/addToCart')
      .set('token', adminToken)
      .send(cartData.addToCartWithProperDetails)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('When_It_Give_ImProperDetails_It_Should_Not_Be_Add_In_Cart_Successfully', (done) => {
    chai.request(server)
      .put('/addToCart')
      .set('token', usertoken)
      .send(cartData.addToCartWithImProperDetails)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('When_It_Give_ImProperDetails_With_WrongToken_It_Should_Not_Be_Add_In_Cart_Successfully', (done) => {
    chai.request(server)
      .put('/addToCart')
      .set('token', adminToken)
      .send(cartData.addToCartWithProperDetails)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('PUT /removeFromCart', () => {
  it('When_It_Give_ProperDetails_It_Should_Be_Remove_From_Cart_Successfully', (done) => {
    chai.request(server)
      .put('/removeFromCart')
      .set('token', usertoken)
      .send(cartData.removefromCartWithProperDetails)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('When_It_Give_ProperDetails_With_WrongToken_It_Should_Not_Be_Add_In_Cart_Successfully', (done) => {
    chai.request(server)
      .put('/removeFromCart')
      .set('token', adminToken)
      .send(cartData.removefromCartWithProperDetails)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('When_It_Give_ImProperDetails_It_Should_Not_Be_Add_In_Cart_Successfully', (done) => {
    chai.request(server)
      .put('/removeFromCart')
      .set('token', usertoken)
      .send(cartData.removefromCartWithImProperDetails)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('When_It_Give_ImProperDetails_With_WrongToken_It_Should_Not_Be_Add_In_Cart_Successfully', (done) => {
    chai.request(server)
      .put('/removeFromCart')
      .set('token', adminToken)
      .send(cartData.removefromCartWithProperDetails)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('PUT /purchaseBook', () => {
  it('When_It_Gives_ProperData_It_Should_Purchase_Cart', (done) => {
    chai.request(server)
      .put('/purchaseBook')
      .set('token', usertoken)
      .send(cartData.isPurchaseStatus)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('When_It_Gives_ImProperData_It_Should_Not_Purchase_Cart', (done) => {
    chai.request(server)
      .put('/purchaseBook')
      .set('token', usertoken)
      .send(cartData.isPurchaseWrongData)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });

  it('When_It_Gives_ImProperData_AndWrongToken_It_Should_Not_Purchase_Cart', (done) => {
    chai.request(server)
      .put('/purchaseBook')
      .set('token', adminToken)
      .send(cartData.isPurchaseWrongData)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('GET /getAllCart', () => {
  it('When_It_Gives_ProperToken_It_Should_GetAll_Cart', (done) => {
    chai.request(server)
      .get('/getAllCart')
      .set('token', usertoken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('When_It_Gives_ImProperToken_It_Should_Not_GetAll_Cart', (done) => {
    chai.request(server)
      .get('/getAllCart')
      .set('token', adminToken)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('When_It_Gives_ImProperEndPoint_It_Should_Not_GetAll_Cart', (done) => {
    chai.request(server)
      .get('/getAll')
      .set('token', usertoken)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('GET /getCartById/:userId', () => {
  it.only('When_It_Gives_ProperData_It_Should_GetPerticular_Cart', (done) => {
    chai.request(server)
      .get('/getCartById/60c0a4af0a9bc417dcbb92bf')
      .set('token', usertoken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('When_It_Gives_ImProperData_It_Should_Not_GetPerticular_Cart', (done) => {
    chai.request(server)
      .get('/getCartById/60c0a4af0a9bc417dcbb9')
      .set('token', usertoken)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it.only('When_It_Gives_ImProperToken_It_Should_Not_GetPerticular_Cart', (done) => {
    chai.request(server)
      .get('/getCartById/60c0a4af0a9bc417dcbb92bf')
      .set('token', adminToken)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
