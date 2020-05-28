const mongoose = require("mongoose");
// Mongoose setup
mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, (error) => {
    if(error) throw error;
    console.log("MongoDB STARTED.");
});

// custom pagination!
const pagination = (req, count) => {

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 2;
    page = page <= 1 ? 1 : page;
    limit = Math.min(2, Math.max(1, limit));

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
}

module.exports.User = require("./user");
module.exports.Post = require("./post");
module.exports.Word = require("./word");
module.exports.mongoose = mongoose;
module.exports.pagination = pagination;