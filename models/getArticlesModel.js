const db = require("../db/connection");

async function getAllArticles() {
  const result = await db.query(
    `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC`
  );
  return result.rows;
}

async function getArticleById(id) {
  const result = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [id]
  );

  const article = result.rows[0];
  return article || Promise.reject("No article found");
}


async function getCommentsByArticleId(id) {
  try {
    const result = await db.query(
      `SELECT comments.*                                                      
      FROM comments                                                                          
      WHERE article_id = $1 
      ORDER BY created_at DESC`,
      [id]
    );
    const comments = result.rows;
    return comments;
  } catch (error) {
    throw error;
  }
}

module.exports = { getArticleById, getAllArticles, getCommentsByArticleId };
