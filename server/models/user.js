const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    created_at: {
        type: Date,
        default: Date.now()
    }
});

userSchema.pre("save", async function(next) {
    try {
        if( !this.isModified("password") ) return next();
        const hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
        next();
    } catch(error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function(attemptedPassword, next) {
    try {
        return await bcrypt.compare(attemptedPassword, this.password);
    } catch(error) {
        next(error);
    }
}

module.exports = mongoose.model("User", userSchema);