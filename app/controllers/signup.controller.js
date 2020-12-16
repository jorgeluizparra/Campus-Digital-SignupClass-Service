// Import functions
const functions = require( './functions/functions');

const db = require("../models");
const Signup = db.signup;
const Op = db.Sequelize.Op;

// Create a new register
exports.create = (req, res) => {
    
    // Validate request
    if (!req.body.name || !req.body.email || !req.body.studentNumber || !req.body.cpf) {
        res.status(400).send({
            message: "Todos os campos devem estar preenchidos."
        });
        return;
    } else if ( Number.isInteger(req.body.studentNumber) ||  req.body.studentNumber.length != 6 ) {
        res.status(400).send({
            message: "O registro acadêmico deve ser um número com 6 digítos."
        });
        return;
    } else if ( Number.isInteger(req.body.cpf) ||  req.body.cpf.length != 11 ) {
        res.status(400).send({
            message: "O registro acadêmico deve ser um número com 11 digítos."
        });
        return;
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
    
    // Validate request
    if (!Number.isInteger(page)) {
        res.status(400).send({
            message: "Valor de página inválido."
        });
        return;
    } 

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
  
};

// Delete a Register with the specified id in the request
exports.delete = (req, res) => {
    
};
