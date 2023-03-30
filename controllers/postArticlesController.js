const postComment = require("../models/postArticlesModel");

async function postArticleComments(req, res, next) {
  try {
    if (!req.body.username || !req.body.body) {
      return res.status(400).send({ error: "No username or body found" });
    }

    const { article_id } = req.params;
    const { username, body } = req.body;

    if (isNaN(article_id)) {
      return res.status(400).send({ message: "Invalid input" });
    }
    const userComment = await postComment(article_id, username, body);
    if (!userComment ) {
        res.status(404).send({
          message: "Comment not found",
        });
      }
    if (userComment) {
      const comment = userComment[0].body;
      res.status(201).send({ comment: comment });
    }
  } catch (error) {
    if (error.status === 400) {
      res.status(400).send({ error: error.message });
    }
    if (error.status === 404) {
        res.status(404).send({ error: error.message });
      }
    next(error);
  }

}

module.exports = postArticleComments;

  
  
