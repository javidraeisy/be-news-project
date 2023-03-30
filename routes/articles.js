const express = require("express");
const router = express.Router();

const {
  getArticleByIdController,
  getAllArticlesController,
  getCommentsByArticleIdController,
} = require("../controllers/getArticlesController");

const postArticleComments = require("../controllers/postArticlesController");

router.get("/", getAllArticlesController);
router.get("/:article_id", getArticleByIdController);
router.get("/:article_id/comments", getCommentsByArticleIdController);

router.post("/:article_id/comments", postArticleComments);

module.exports = router;
