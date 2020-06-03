module.exports = (req, count) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    page = page <= 1 ? 1 : page;
    limit = Math.min(5, Math.max(1, limit));

    const startIndex = (page - 1) * limit;
    const endIndex = (page) * limit;

    const pagination = {
        limit: limit,
        page: page,
        total: count,
        pages: Math.ceil(count / limit),
        remaining: count - (startIndex + limit),
        hasMore: count - (startIndex + limit) > 0
    };

    if(endIndex < count) pagination.next = { page: page + 1, limit: limit }
    if(startIndex > 0) pagination.prev = { page: page - 1, limit: limit }

    return pagination;
};