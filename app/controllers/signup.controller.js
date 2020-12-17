const { validationResult } = require("express-validator");
const db = require("../models");
const Signup = db.signup;

// Import functions
const functions = require( './functions/functions');

// Create a new register
exports.create = (req, res) => {

    const schemaErrors = validationResult(req);

    if(!schemaErrors.isEmpty()){
        return res.status(403).send(schemaErrors.array())
    }

    // Create a Register
    const register = {
        name: req.body.name,
        email: req.body.email,
        studentNumber: req.body.studentNumber,
        cpf: req.body.cpf,
    };

    // Save Register in the database
    Signup.create(register)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Ocorreu um erro ao tentar salvar o cadastro."
            });
        });
};

// Retrieve all Registers from the database or specifics registers if search is set.
exports.getAll = (req, res) => {

    var search = req.query.search ? req.query.search : '';
    var page = req.query.page ? req.query.page : 0;

    const condition = functions.setSearchCondition(search)
    const { limit, offset } = functions.getPagination(page, 10);

    Signup.findAndCountAll({where: condition, limit, offset})
        .then(data => {
            const response = functions.getPageData(data, page, limit, search);
            res.send(response)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocorreu algum erro ao tentar buscar os cadastros."
            })
        })
    
};

// Update a Register by the id in the request
exports.update = (req, res) => {

    const schemaErrors = validationResult(req);

    if(!schemaErrors.isEmpty()){
        return res.status(403).send(schemaErrors.array())
    }

    const id = req.params.id;

    const name = req.body.name;
    const email = req.body.email;

    const updateFields = {};

    if (email && name) {
        updateFields.name = name;
        updateFields.email = email;
    } else if (email && !name) {
        updateFields.email =email;
    } else if (name && !email) {
        updateFields.name =name;
    } else {
        return res.status(400).send("Todos os campos estavam em branco.")
    }

    Signup.update(updateFields, { 
        where: { id : id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: `Cadastro ${id} atualizado com sucesso.`,
                    data: updateFields
                })
            } else {
                res.status(400).send({
                    message: `Não foi possivel atualizar o cadastro ${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Erro ao tentar atualizar o cadastro ${id}.`
            });
        })
};

// Delete a Register with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Signup.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                id: id,
                message: 'Cadastro deletado com sucesso.'
            });
        } else {
            res.status(400).send({
                message: 'Cadastro não foi encontrado.'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 'Erro ao tentar deletar o cadastro.'
        });
    });
};
