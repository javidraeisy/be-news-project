const db = require("../db/connection");

async function postComment(articleId, username, body) {
  try {
    const result = await db.query(
      `INSERT INTO comments (article_id, author, body) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [articleId, username, body]
    );
    const comment = result.rows;

    return comment;
  } catch (error) {
    throw error;
  }
}

module.exports = postComment;
