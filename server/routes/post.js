const router = require("express").Router();
const controller = require("../controllers");
const auth = require("../middlewares/auth");

router.route("/").get(controller.getPosts).post(auth, controller.addPost);

router.get("/user", auth, controller.userPosts);

router.route("/:id")
    .get(controller.getPost)
    .delete(auth, controller.deletePost)
    .post(auth, controller.updatePost);

module.exports = router;