const express = require("express");
const router = express.Router();

const {
  getArticleByIdController,
  getArticleController,
} = require("../controllers/getArticlesController");

router.get("/", getArticleController);
router.get("/:article_id", getArticleByIdController);
module.exports = router;
