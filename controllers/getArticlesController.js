const { getArticleById, getAllArticles } = require("../models/getArticlesModel");

async function getAllArticlesController(req, res, next) {
  const returnedArticle = await getAllArticles();


  const returnedArticles = returnedArticle.map((article) => {
    return {
      ...article,
      comment_count: Number(article.comment_count),
    };
  });
  
  res.status(200).send({ article: returnedArticles });
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

module.exports = { getArticleByIdController, getAllArticlesController };
