const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    text: String,
    word: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Word"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    liked: {
        type: Number,
        default: 0
    },
    disliked: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Post", postSchema);