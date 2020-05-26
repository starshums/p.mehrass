module.exports = (model) => async (req,res,next) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 2;

    page = page <= 1 ? 1 : page;
    limit = Math.min(2, Math.max(1, limit));

    const startIndex = (page - 1) * limit;
    const endIndex = (page) * limit;
    const totalCount = await model.countDocuments().exec();

    const results = {
        rows:{},
        pagination: {
            totalRows: totalCount,
            index: startIndex
        }
    }

    results.pagination.hasMore = totalCount - ( startIndex + limit ) > 0;
    results.pagination.currentPage = page;
    results.pagination.limit = limit;
    results.pagination.totalPages = Math.ceil(totalCount / limit);

    // next
    if(endIndex < totalCount) results.pagination.next = { page: page + 1, limit: limit }
    // previous
    // if(startIndex > 0) results..pagination.prev = { page: page - 1, limit: limit }

    results.rows = await model.find().limit(limit).skip(startIndex).select('-posts');

    req.pagination = results;
    next();
}