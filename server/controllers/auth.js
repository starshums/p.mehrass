const jwt = require("jsonwebtoken");
const db = require("../models")

exports.register = async (req, res, next) => {
    try {
        const user = await db.User.findOne({ email: req.body.email });
        if(!user) {
            const savedUser = await db.User.create({
                username: req.body.username.toString(),
                email: req.body.email.toString(),
                password: req.body.password.toString()
            });
            const { id, username, email } = savedUser;
            const token = jwt.sign({id, email}, process.env.SECRET);
            res.status(201).json({ id, username, email, token });
        } else {
            res.status(400).json({
                msg: "User with the same email address already exists."
            });
        }
    } catch(error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await db.User.findOne({ email: req.body.email });
        if(user) {
            const { id, username, email } = user;
            const valid = user.comparePassword(req.body.password);
            if(valid) {
                const token = jwt.sign({id, email, username}, process.env.SECRET);
                res.status(200).json({ id, username, email, token });
            } else {
                throw new Error("Incorrect login.");
            }
        } else {
            const error = new Error("Incorrect login.");
            next(error);
        }
    } catch(error) {
        error.message = "Invalid login";
        next(error);
    }
};