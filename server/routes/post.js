const router = require("express").Router();
const controller = require("../controllers");
const auth = require("../middlewares/auth");

router.route("/")
    .get(controller.getPosts)
    .post(auth, controller.addPost);

router.get("/user", auth, controller.userPosts);

router.route("/:id")
    .get(controller.getPost)
    .delete(auth, controller.deletePost)
    .post(auth, controller.updatePost);

router.route("/like/:id").post(auth, controller.likePost);
router.route("/dislike/:id").post(auth, controller.dislikePost);

module.exports = router;