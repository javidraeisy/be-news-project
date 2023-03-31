
const { fetchArticles, fetchSpecificArticle, fetchArticleComments, addArticleComment, articlePatcher, fetchComments, removeComment } = require('../models/postArticlesModel')











exports.postArticleComment = (req, res, next) => {
  const articleNumber = req.params.article_id
  const comment = req.body
  const commentBody = req.body.body
  const username = req.body.username

  if (!commentBody || !username) {
      res.status(400).send({ msg: 'Please make sure you include a comment and a username' })
  }
  fetchSpecificArticle(articleNumber)
      .then((result) => {
          if (result) return addArticleComment(comment, articleNumber)
      }).then((result) => {
          res.status(201).send({ comment: result })
      }).catch((err) => {
          next(err);
      })

}