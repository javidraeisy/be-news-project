const express = require("express");
const router = express.Router();

const {
  getArticleByIdController,

} = require("../controllers/getArticlesController");

router.get("/:article_id", getArticleByIdController);
module.exports = router;
