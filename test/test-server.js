const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

const should = chai.should();
const app = server.app;

chai.use(chaiHttp);


describe('Cards Test Index Page', function(){
	it('index should be alive', function(){
		chai.request(app)
		.get('/')
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});

	it('sign up page exists', function(){
		chai.request(app)
		.get('/sign-up')
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});

	it('start page exists', function(){
		chai.request(app)
		.get('/start')
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});

	it('new card page is active', function(){
		chai.request(app)
		.get('/new-card')
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});

	it('sumary page exists', function(){
		chai.request(app)
		.get('/summary')
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});

	it('end page exists', function(){
		chai.request(app)
		.get('/end')
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.html;
			done();
		});
	});
});


