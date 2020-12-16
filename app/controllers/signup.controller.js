const db = require("../models");
const Signup = db.signup;
const Op = db.Sequelize.Op;

// Pagination
const getPagination  = (page, limit) => {

    const offset = page * limit;

    return { limit, offset}
}

const getPageData = (data, page, limit, search) => {
    const { count: totalItems, rows: items } = data;
    const totalPages = Math.ceil(totalItems / limit);
    
    const nextPage = page < (totalPages - 1) ? '/api/v1/signups?page=' + (page + 1) + '&search=' + search : '';
    const previousPage = page > 0 ? '/api/v1/signups?page=' + (page - 1) + '&search=' + search : '';

    return { totalItems, items, totalPages, page, nextPage, previousPage}
}

// Condition
const setSearchCondition = (search) => {
    if (!search || search == null) {
        return null;
    } else {
        return {
            [Op.or]: [
                {
                    name: { [Op.like]: `%${search}%`}
                },
                {
                    email: { [Op.like]: `%${search}%`}
                },
                {
                    cpf: { [Op.like]: `%${search}%`}
                },
                {
                    studentNumber: { [Op.like]: `%${search}%`}
                }
            ]
        };
    }
}

// Create a new register
exports.create = (req, res) => {
    
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

    const condition = setSearchCondition(search)
    const { limit, offset } = getPagination(page, 10);

    Signup.findAndCountAll({where: condition, limit, offset})
        .then(data => {
            const response = getPageData(data, page, limit, search);
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
