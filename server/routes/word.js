const router = require("express").Router();
const controller = require("../controllers");
const auth = require("../middlewares/auth");
const pagination = require("../middlewares/pagination");
const db = require("../models");

router.route("/").get(pagination(db.Word), controller.getWords);
router.route("/:id").get(controller.getWordPosts);

module.exports = router;