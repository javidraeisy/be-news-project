const {
  getArticleById,
  getArticlesModels,
} = require("../models/getArticlesModel");

async function getArticleController(req, res, next) {
  try {
    const returnedArticles = await getArticlesModels();

    res.status(200).send({ articles: returnedArticles });
  } catch (error) {
    next(error);
  }
}

async function getArticleByIdController(req, res, next) {
  try {
    const articleId = req.params.article_id;
    if (isNaN(articleId)) {
      return res.status(400).send({ message: "Invalid input" });
    }
    const returnedArticle = await getArticleById(articleId);
    if (!returnedArticle || returnedArticle.length === 0) {
      res.status(404).send({
        message: "Article not found",
      });
    } else {
      const newObject = {
        ...returnedArticle,
        comment_count: Number(returnedArticle.comment_count),
      };

      res.status(200).send({ articleById: newObject });
    }
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

module.exports = { getArticleByIdController, getArticleController };
