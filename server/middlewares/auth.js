const jwt = require("jsonwebtoken");

module.exports = ( req, res, next ) => {
    if( req.header("auth-token") ) {
        const token = req.header("auth-token");
        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if(error) {
                next(Error("Unauthorized."));
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        next(Error("Unauthorized."));
    }
}