// const { getArticleById } = require("../models/getArticlesModel");

// async function getArticleByIdController(req, res, next) {
//   const articleId = req.params.article_id;

//   if (isNaN(articleId)) {
//     return res.status(400).send({ message: "Invalid input" });
//   }

//   const returnedArticle = await getArticleById(articleId);

//   res.status(200).send({ article: returnedArticle });
// }
const { getArticleById } = require("../models/getArticlesModel");

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

module.exports = { getArticleByIdController };
