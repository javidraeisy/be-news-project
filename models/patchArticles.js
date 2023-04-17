const db = require("../db/connection");

async function updateVoteCount(articleId, newVotes) {
  try {
    const result = await db.query(
      `UPDATE articles
      SET votes = CASE
        WHEN $1 < 0 THEN votes - ABS($1)
        ELSE votes + $1
      END
      WHERE article_id = $2
      RETURNING *`,
      [newVotes, articleId]
    );
    if (result.rows.length === 0) {
      return [];
    }
    const updatedVotes = result.rows[0];

    return updatedVotes;
  } catch (error) {
    
    throw error;
  }
}

module.exports = updateVoteCount;