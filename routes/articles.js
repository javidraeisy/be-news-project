const express = require("express");
const router = express.Router();

const {
  getArticleByIdController,
  getAllArticlesController,
  getCommentsByArticleIdController,
} = require("../controllers/getArticlesController");

router.get("/", getAllArticlesController);
router.get("/:article_id", getArticleByIdController);
router.get("/:article_id/comments", getCommentsByArticleIdController);

module.exports = router;
