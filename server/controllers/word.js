const db = require("../models");

// Get all words
exports.getWords = async (req, res, next) => {
  try {
      
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const words = await db.Word.aggregate()
    .project({
        "posts_count": { "$size": "$posts" },
        "text": 1,
        "tifinagh": 1,
        "latin": 1,
        "created_at": 1
    })
    .limit(skip + limit)
    .skip(skip);

    const wordsCount = await db.Word.countDocuments().exec();
    const pagination = db.pagination(req, wordsCount);
    res.status(200).json({words, pagination});

  } catch (error) {
    error.status = 400;
    next(error);
  }
};

// Get all word posts!
exports.getWordPosts = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const { id } = req.params;

    const foundWord = await db.Word.aggregate([
      { $match: { _id: db.mongoose.Types.ObjectId(id) } },
      { $project: {
          postsCount: { $size: "$posts" },
          text: 1,
          tifinagh: 1,
          latin: 1,
          created_at: 1,
          posts: 1,
        },
      },
    ]);

    if(foundWord.length === 0) throw new Error("No word was found.");

    const word = await db.Word.populate(foundWord, {
      path: "posts",
      options: ["id", "created_at", "text", "user" ],
      select: ["-word"],
      populate: {
        path: "user",
        model: "User",
        select: "_id username email",
      },
      limit: limit,
      skip: skip,
    });

    const pagination = db.pagination(req, word[0].postsCount);
    res.json({ word, pagination });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
