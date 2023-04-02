const db = require("../db/connection");

async function deleteCommentById(commentId) {
  const result = await db.query(
    `DELETE FROM comments
    WHERE comment_id = $1`,
    [commentId]
  );

  return result.rowCount;
}

module.exports = deleteCommentById;