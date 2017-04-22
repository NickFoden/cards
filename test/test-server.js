const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const {PORT, DATABASE_URL} = require('../config');

chai.use(chaiHttp);

const expect = require('chai').expect;

const {closeServer, runServer, app} =  require('../server');


describe('Cards Test', function(){
	before(function(){
		return runServer(DATABASE_URL);
	});
	after(function(){
		return closeServer();
	});

	describe('Check Server', function(){
		it('should see if server is running', function(){
		chai.request('/')
		.get('/')
		.then(res => {
			if (res.status >= 200) {
				return res;
				}
			})
		});
	});


});