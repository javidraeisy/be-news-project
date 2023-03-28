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

    const returnedArticle = await getArticleById(articleId);


      res.status(200).send({ articleById: returnedArticle });

  } catch (error) {
    next(error);

  }
}

module.exports = { getArticleByIdController, getArticleController };
