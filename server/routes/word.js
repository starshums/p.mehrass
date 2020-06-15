const router = require("express").Router();
const controller = require("../controllers");
const auth = require("../middlewares/auth");
const db = require("../models");

router.route("/").get(controller.getWords).post(auth, controller.addWord);
router.route("/:id").get(controller.getWordPosts);

module.exports = router;