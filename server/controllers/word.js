const db = require("../models");

// Get all words
exports.getWords = async (req, res, next) => {
    try {
        //const words = await db.Word.find().select('-posts');

        // await db.Word.aggregate()
        // .project({ "posts_count": { "$size": "$posts" }, "text": 1, "created_at": 1 })
        // .exec(function (err, words) {
        //     if(err) throw err;
        //     res.status(200).json(words);
        // });

        res.status(200).json( req.pagination );

    } catch(error) {
        error.status = 400;
        next(error);
    }
}

// Get all word posts!
exports.getWordPosts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const word = await db.Word.findById(id).populate({
            path: "posts",
            options: [ "id", "created_at","text", "user" ],
            populate: {
                path: "user",
                model: "User",
                select: "_id username email"
            }
        });

        if(!word) throw new Error("No word was found.");
        res.status(200).json(word);
    } catch(error) {
        error.status = 400;
        next(error);
    }
}