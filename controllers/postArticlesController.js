const postComment = require("../models/postArticlesModel");

async function postArticleComments(req, res, next) {
  if (!req.body.username || !req.body.body) {
    return res.status(400).send({ error: "No username or body found" });
  }
  const { article_id } = req.params;
  const { username, body } = req.body;
  try {
    const userComment = await postComment(article_id, username, body);
    if (userComment) {
      const comment = userComment[0].body;

      res.status(201).send({ comment });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = postArticleComments;
