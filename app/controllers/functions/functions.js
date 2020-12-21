const db = require("../../models");
const Op = db.Sequelize.Op;

// Pagination
exports.getPagination  = (page, limit) => {

    const offset = page * limit;

    return { limit, offset}
}

exports.getPageData = (data, page, limit, search) => {
    const { count: totalItems, rows: items } = data;
    const totalPages = Math.ceil(totalItems / limit);
    
    const nextPage = page >= totalPages ? totalPages : (parseInt(page) + 1);
    const previousPage = page <= 0 ? 0 : (parseInt(page) - 1);

    return { totalItems, items, totalPages, page, nextPage, previousPage, search}
}

// Condition
exports.setSearchCondition = (search) => {
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