const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

describe('/GET all bills', () => {
  it('Should get all of the bills for one user', done => {
    chai
      .request(server)
      .get('/api/user/bills/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Array');
        done();
      });
  });

  it('Should get one specific bill', done => {
    chai
      .request(server)
      .get('/api/contacts/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Array');
        done();
      });
  });

  it('Should get all of the contacts for one user', done => {
    chai
      .request(server)
      .get('/api/bills/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        done();
      });
  });

  it('Should get one user', done => {
    chai
      .request(server)
      .get('/api/user/test')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('Object');
        done();
      });
  });
});

describe('/UPDATE', () => {
  it('should return an error when updating an unexistent bill', done => {
    chai
      .request(server)
      .put('/api/bills/2')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Bill Not Found');
        done();
      });
  });
});

describe('/DELETE', () => {
  it('should return an error when deleting an unexistent bill', done => {
    chai
      .request(server)
      .delete('/api/bills/121212121')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Bill Not Found');
        done();
      });
  });

  it('should return an error if a not valid id was provided', done => {
    chai
      .request(server)
      .delete('/api/bills/not_valid_id')
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
