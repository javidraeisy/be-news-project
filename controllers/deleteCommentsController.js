const { errorHandler } = require("../errorsHandling/errorHandler");
const deleteCommentById = require("../models/deleteCommentsModels");

async function deleteComment(req, res, next) {
  const { comment_id } = req.params;
  
  try {
    // queries to delete comment_id
    const requestCommentDeletion = await deleteCommentById(comment_id);
    if(requestCommentDeletion === 1) {
    res.status(204).send();
    } else {
        res.status(404).send({msg: 'comment not found'}); 
    }
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

module.exports = deleteComment;
