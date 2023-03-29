const express = require("express");
const router = express.Router();

const {
  getArticleByIdController,
  getAllArticlesController,
} = require("../controllers/getArticlesController");

router.get("/", getAllArticlesController);
router.get("/:article_id", getArticleByIdController);
module.exports = router;
