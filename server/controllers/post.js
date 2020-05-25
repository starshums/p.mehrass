const db = require("../models");

// Get all posts!
exports.getPosts = async (req, res, next) => {
    try {
        const posts = await db.Post.find().populate("user", ["id", "username", "email"]);
        res.status(200).json(posts);
    } catch(error) {
        error.status = 400;
        next(error);
    }
}

// Add a new post!
exports.addPost = async (req, res, next) => {
    try {
        const word_id = "5ebebf0259127e42e87fdd05";
        const word = await db.Word.findById(word_id);
        const { id } = req.user;
        const user = await db.User.findById(id);
        const { text } = req.body;
        const post = await db.Post.create({ text, user, word });
        user.posts.push(post.id);
        word.posts.push(post.id);
        await word.save();
        await user.save();
        await post.save();
        res.status(201).json(post);

    } catch(error) {
        error.status = 400;
        next(error);
    }
}

// Get all user posts!
exports.userPosts = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await db.User.findById(id).populate("posts");
        if(!user) throw new Error("Unauthorized.");
        res.status(200).json(user.posts);

    } catch(error) {
        error.status = 400;
        next(error);
    }
}

// Get post detail!
exports.getPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await db.Post.findById(id).populate("user", ["username", "id"]).populate("word", ["id", "text"]);
        if(!post) throw new Error("No post was found.");
        res.status(200).json(post);
    } catch(error) {
        error.status = 400;
        next(error);
    }
}

// Update a post!
exports.updatePost = async (req, res, next) => {
    try {
        const { text } = req.body;
        const { id } = req.params;
        const { id: user_id } = req.user;
        const post = await db.Post.findById(id);
        if(!post) throw new Error("No post was found.");
        if(post.user.toString() !== user_id) throw new Error("Unauthorized access.");
        post.text = text;
        await post.save();
        res.status(202).json(post);
    } catch(error) {
        error.status = 400;
        next(error);
    }
}

// Delete a post!
exports.deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: user_id } = req.user;
        const post = await db.Post.findById(id);
        if(!post) throw new Error("No post was found.");
        if(post.user.toString() !== user_id) throw new Error("Unauthorized access.");
        await post.remove();
        res.status(202).json(post);
    } catch(error) {
        error.status = 400;
        next(error);
    }
}

// Like a post!
exports.likePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: user_id } = req.user;
        const post = await db.Post.findById(id);
        if(!post) throw new Error("No post was found.");
        post.liked++;
        await post.save();
        console.log(post.liked);
        res.status(202).json(post);
    } catch(error) {
        error.status = 400;
        next(error);
    }
}

// Dislike a post!
exports.dislikePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: user_id } = req.user;
        const post = await db.Post.findById(id);
        if(!post) throw new Error("No post was found.");
        post.liked--;
        await post.save();
        console.log(post.liked);
        res.status(202).json(post);
    } catch(error) {
        error.status = 400;
        next(error);
    }
}