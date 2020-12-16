// Set test enviroment
process.env.NODE_ENV = 'test';

const db = require("../app/models");
const Signup = db.signup;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
let assert = chai.assert;

chai.use(chaiHttp);

describe('Signup', () => {
    beforeEach((done) => {
        Signup.destroy({
            where: {},
            truncate: false    
        })
        .then(res => {
            done();
        })
        .catch(err => {
            console.log(err);
            done();
        });
    });

    describe('/GET signups', () => {
        it('It should get all registers', (done) => {
            chai.request(server)
                .get('/api/v1/signups')
                .end((err, res) => {
                    assert.equal(res.status, 200, "Status different to 200.")
                    assert.isObject(res.body, "Body is not an object.")
                    assert.isArray(res.body.items, "Items is not an array.")
                    assert.hasAllKeys(res.body, ['totalItems', 'items', 'totalPages', 'page', 'nextPage','previousPage'], 'Body schema is wrong.');
                    done();
                })
        })

        it('It should get registers filtering by null.', (done) => {
            chai.request(server)
                .get('/api/v1/signups?search=null')
                .end((err, res) => {
                    assert.equal(res.status, 200, "Status different to 200.")
                    assert.isObject(res.body, "Body is not an object.")
                    assert.isArray(res.body.items, "Items is not an array.")
                    assert.hasAllKeys(res.body, ['totalItems', 'items', 'totalPages', 'page', 'nextPage','previousPage'], 'Body schema is wrong.');
                    done();
                })
        })

        it('It should get registers filtering by string.', (done) => {
            chai.request(server)
                .get('/api/v1/signups?search=teste')
                .end((err, res) => {
                    assert.equal(res.status, 200, "Status different to 200.")
                    assert.isObject(res.body, "Body is not an object.")
                    assert.isArray(res.body.items, "Items is not an array.")
                    assert.hasAllKeys(res.body, ['totalItems', 'items', 'totalPages', 'page', 'nextPage','previousPage'], 'Body schema is wrong.');
                    done();
                })
        })

        it('It should get registers filtering by number.', (done) => {
            chai.request(server)
                .get('/api/v1/signups?search=2020')
                .end((err, res) => {
                    assert.equal(res.status, 200, "Status different to 200.")
                    assert.isObject(res.body, "Body is not an object.")
                    assert.isArray(res.body.items, "Items is not an array.")
                    assert.hasAllKeys(res.body, ['totalItems', 'items', 'totalPages', 'page', 'nextPage','previousPage'], 'Body schema is wrong.');
                    done();
                })
        })

        it('It should get registers filtering by boolean.', (done) => {
            chai.request(server)
                .get('/api/v1/signups?search=true')
                .end((err, res) => {
                    assert.equal(res.status, 200, "Status different to 200.")
                    assert.isObject(res.body, "Body is not an object.")
                    assert.isArray(res.body.items, "Items is not an array.")
                    assert.hasAllKeys(res.body, ['totalItems', 'items', 'totalPages', 'page', 'nextPage','previousPage'], 'Body schema is wrong.');
                    done();
                })
        })        
    });

})
