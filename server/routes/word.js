const router = require("express").Router();
const controller = require("../controllers");
const auth = require("../middlewares/auth");

router.route("/").get(controller.getWords);
router.route("/:id").get(controller.getWordPosts);

module.exports = router;