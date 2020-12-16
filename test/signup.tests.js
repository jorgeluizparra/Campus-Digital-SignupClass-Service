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

    describe('/POST signup', () => {
        it('It should create a register', (done) => {
            chai.request(server)
                .post('/api/v1/signups')
                .send({
                    name: 'Teste',
                    email: 'test@test.com',
                    studentNumber: 123456,
                    cpf: 11122233344
                })
                .end((err, res) => {
                    assert.equal(res.status, 200, "Status different to 200.")
                    assert.isObject(res.body, "Items is not an object.")
                    assert.hasAllKeys(res.body, ['id', 'name', 'email', 'studentNumber', 'cpf','updatedAt', 'createdAt'], 'Body schema is wrong.');
                    console.log(res);
                    done();
                })
        })

        it('Null name, It should not create a register', (done) => {
            chai.request(server)
                .post('/api/v1/signups')
                .send({
                    name: '',
                    email: 'test@test.com',
                    studentNumber: 123456,
                    cpf: 11122233344
                })
                .end((err, res) => {
                    assert.equal(res.status, 400, "Status different to 400. ")
                    done();
                })
        })

        it('Invalid email, It should not create a register', (done) => {
            chai.request(server)
                .post('/api/v1/signups')
                .send({
                    name: 'Teste',
                    email: 'testtest.com',
                    studentNumber: 123456,
                    cpf: 11122233344
                })
                .end((err, res) => {
                    assert.equal(res.status, 400, "Status different to 400. ")
                    done();
                })
        })

        it('Empty student number, It should not create a register', (done) => {
            chai.request(server)
                .post('/api/v1/signups')
                .send({
                    name: 'Teste',
                    email: 'test@test.com',
                    studentNumber: '',
                    cpf: 11122233344
                })
                .end((err, res) => {
                    assert.equal(res.status, 400, "Status different to 400. ")
                    done();
                })
        })

        it('Student number as string, It should not create a register', (done) => {
            chai.request(server)
                .post('/api/v1/signups')
                .send({
                    name: 'Teste',
                    email: 'test@test.com',
                    studentNumber: 'abcdef',
                    cpf: 11122233344
                })
                .end((err, res) => {
                    assert.equal(res.status, 400, "Status different to 400. ")
                    done();
                })
        })

        it('Student number without 6 caracthers, It should not create a register', (done) => {
            chai.request(server)
                .post('/api/v1/signups')
                .send({
                    name: 'Teste',
                    email: 'test@test.com',
                    studentNumber: 12345,
                    cpf: 11122233344
                })
                .end((err, res) => {
                    assert.equal(res.status, 400, "Status different to 400. ")
                    done();
                })
        })

        it('Empty CPF, It should not create a register', (done) => {
            chai.request(server)
                .post('/api/v1/signups')
                .send({
                    name: 'Teste',
                    email: 'test@test.com',
                    studentNumber: 123456,
                    cpf: ''
                })
                .end((err, res) => {
                    assert.equal(res.status, 400, "Status different to 400. ")
                    done();
                })
        })

        it('CPF as string, It should not create a register', (done) => {
            chai.request(server)
                .post('/api/v1/signups')
                .send({
                    name: 'Teste',
                    email: 'test@test.com',
                    studentNumber: 123456,
                    cpf: '11122233344'
                })
                .end((err, res) => {
                    assert.equal(res.status, 400, "Status different to 400. ")
                    done();
                })
        })

        it('CPF without 11 caracthers, It should not create a register', (done) => {
            chai.request(server)
                .post('/api/v1/signups')
                .send({
                    name: 'Teste',
                    email: 'test@test.com',
                    studentNumber: 12345,
                    cpf: 1112223334
                })
                .end((err, res) => {
                    assert.equal(res.status, 400, "Status different to 400. ")
                    done();
                })
        })

    });

})
