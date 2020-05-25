module.exports = {
    ...require("./auth"),
    ...require("./post"),
    ...require("./word")
};

module.exports.errors = (error, req, res, next) => {
    res.status(error.status || 400).json({
        message: error.message || "Something went wrong"
    });
};

module.exports.notFound = (req, res, next) => {
    const error = new Error("404 Page Not Found");
    error.status = 404;
    next(error);
};