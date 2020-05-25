const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
    text: {
        type: String,
        unique: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

module.exports = mongoose.model("Word", wordSchema);