// Pagination
exports.getPagination  = (page, limit) => {

    const offset = page * limit;

    return { limit, offset}
}

exports.getPageData = (data, page, limit, search) => {
    const { count: totalItems, rows: items } = data;
    const totalPages = Math.ceil(totalItems / limit);
    
    const nextPage = page < (totalPages - 1) ? '/api/v1/signups?page=' + (page + 1) + '&search=' + search : '';
    const previousPage = page > 0 ? '/api/v1/signups?page=' + (page - 1) + '&search=' + search : '';

    return { totalItems, items, totalPages, page, nextPage, previousPage}
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