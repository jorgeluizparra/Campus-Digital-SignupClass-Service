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

    // GET TEST
    describe('GET', () => {
        it('It should get all registers', (done) => {
            chai.request(server)
                .get('/api/v1/signups?page=0')
                .end((err, res) => {
                    assert.equal(res.status, 200, "Status different to 200.")
                    assert.isObject(res.body, "Body is not an object.")
                    assert.isArray(res.body.items, "Items is not an array.")
                    assert.hasAllKeys(res.body, ['totalItems', 'items', 'totalPages', 'page', 'nextPage','previousPage', 'search'], 'Body schema is wrong.');
                    done();
                })
        });

        it('It should filter and get registers', (done) => {
            chai.request(server)
                .get('/api/v1/signups?search=teste&page=0')
                .end((err, res) => {
                    assert.equal(res.status, 200, "Status different to 200.")
                    assert.isObject(res.body, "Body is not an object.")
                    assert.isArray(res.body.items, "Items is not an array.")
                    assert.hasAllKeys(res.body, ['totalItems', 'items', 'totalPages', 'page', 'nextPage','previousPage', 'search'], 'Body schema is wrong.');
                    done();
                })
        });
    });

    // POST TEST
    describe('POST', () => {
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
                    assert.equal(res.status, 200, "Error to signup. Status different to 200.")
                    assert.isObject(res.body, "Items is not an object.")
                    assert.hasAllKeys(res.body, ['id', 'name', 'email', 'studentNumber', 'cpf','updatedAt', 'createdAt'], 'Body schema is wrong.');
                    done();
                })
        });

        it('It should not create a register', (done) => {
            chai.request(server)
                .post('/api/v1/signups')
                .send({
                    name: '',
                    email: 'teste@teste.com',
                    studentNumber: 123456,
                    cpf: 12345678901
                })
                .end((err, res) => {
                    assert.notEqual(res.status, 200, "Register can not have empty values.")
                    // console.log(res.body)
                    assert.isArray(res.body, "Items is not an array.")
                    assert.exists(res.body[0].msg, 'Message is not set.');
                    assert.isString(res.body[0].msg, "Message is not a string.")
                    done();
                })
        });

        it('It should not create a register', (done) => {
            let payload = {
                name: 'test',
                email: 'test@test.com',
                studentNumber: 123456,
                cpf: 11122233355
            }
            let register = new Signup(payload)
            register.save((err, payload) => {
                chai.request(server)
                .post('/api/v1/signups')
                .send(payload)
                .end((err, res) => {
                    assert.notEqual(res.status, 200, "Register values must be unique.")
                    console.log(res)
                    assert.isArray(res.body, "Items is not an array.")
                    assert.exists(res.body[0].msg, 'Message is not set.');
                    assert.isString(res.body[0].msg, "Message is not a string.")
                    done();
                })
            })
            .then(res => {
                done()
            })
            .catch(err => {
                done()
            })
        });
    });

    // PUT TEST
    describe('PUT', () => {
        it('It should update a register', (done) => {
            let register = new Signup({
                name: 'test',
                email: 'test@test.com',
                studentNumber: 123456,
                cpf: 11122233355
            })
            register.save((err, register) => {
                chai.request(server)
                    .put('/api/v1/signups/' + register.id)
                    .send({
                        name: 'Teste2',
                        email: 'test2@test.com'
                    })
                    .end((err, res) => {
                        assert.equal(res.status, 200, "Error to update. Status different to 200.")
                        done();
                    })
            })
            .then(res => {
                done()
            })
            .catch(err => {
                done()
            })
        });
    });

    // DELETE TEST
    describe('DELETE', () => {
        it('It should delete a register', (done) => {
            let register = new Signup({
                name: 'test',
                email: 'test@test.com',
                studentNumber: 123456,
                cpf: 11122233355
            })
            register.save((err, register) => {
                chai.request(server)
                    .delete('/api/v1/signups/' + register.id)
                    .end((err, res) => {
                        assert.equal(res.status, 200, "Error to delete. Status different to 200.")
                        done();
                    })
            })
            .then(res => {
                done()
            })
            .catch(err => {
                done()
            })
        });

        it('It should not delete a register', (done) => {
            let register = new Signup({
                name: 'test',
                email: 'test@test.com',
                studentNumber: 123456,
                cpf: 11122233355
            })
            register.save((err, register) => {
                chai.request(server)
                    .delete('/api/v1/signups/' + (register.id + 1) )
                    .end((err, res) => {
                        assert.notEqual(res.status, 200, "Post was deleted.")
                        done();
                    })
            })
            .then(res => {
                done()
            })
            .catch(err => {
                done()
            })
        });
    });

});
