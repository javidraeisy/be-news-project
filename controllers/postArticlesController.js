const {
  fetchSpecificArticle,
  addArticleComment,
} = require("../models/postArticlesModel");

exports.postArticleComments = (req, res, next) => {
  const articleId = req.params.article_id;
  const comment = req.body;
  const commentBody = req.body.body;
  const username = req.body.username;
  
  if (!commentBody || !username) {
    res
      .status(400)
      .send({
        message: "Please make sure you include a comment and a username",
      });
  }
  fetchSpecificArticle(articleId)
    .then((result) => {
      if (result) return addArticleComment(comment, articleId);
    })
    .then((result) => {
      res.status(201).send({ comment: result });
    })
    .catch((err) => {
      next(err);
    });
};
