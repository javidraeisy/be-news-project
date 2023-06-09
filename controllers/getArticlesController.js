const {
  getArticleById,
  // getAllArticles,
  getCommentsByArticleId,
  fetchArticles,
  selectTopic,
} = require("../models/getArticlesModel");

async function getAllArticlesController(req, res, next) {
  const { topic, sort_by, order, limit, p } = req.query;

  const articlesPromise = fetchArticles(topic, sort_by, order, limit, p);
  const checkTopic = selectTopic(topic);

  Promise.all([articlesPromise, checkTopic])
    .then((promisesResult) => {
      const articles = promisesResult[0];
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

async function getArticleByIdController(req, res, next) {
  try {
    const articleId = req.params.article_id;

    if (isNaN(articleId)) {
      return res.status(400).send({ message: "Invalid input" });
    }

    const returnedArticle = await getArticleById(articleId);
    res.status(200).send({ article: returnedArticle });
  } catch (error) {
    // if (error.message === "No article found") {
    //   return res.status(404).send({ message: "Article not found" });
    // }
    if (error.status === 400) {
      res.status(400).send({ error: error.message });
    }
    next(error);
  }
}

async function getCommentsByArticleIdController(req, res, next) {
  try {
    const { article_id } = req.params;
    if (isNaN(article_id)) {
      return res.status(400).send({ message: "Invalid input" });
    }
    const comments = await getCommentsByArticleId(article_id);
    if (!comments) {
      res.status(404).send({ message: "Comments not found" });
    } else if (comments.length === 0) {
      res.status(404).send({
        message: [],
      });
    } else {
      res.status(200).send({ articleComments: comments });
    }
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

module.exports = {
  getArticleByIdController,
  getAllArticlesController,
  getCommentsByArticleIdController,
};
