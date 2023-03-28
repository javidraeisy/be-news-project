const db = require("../db/connection");

async function getArticlesModels() {
  try {
    const result = await db.query(`SELECT * FROM articles `);

    const article = result.rows;
    return article;
  } catch (error) {
    throw error;
  }
}

async function getArticleById(id) {
  try {
    const result = await db.query(`SELECT * FROM articles WHERE id = $1`, [id]);

    const article = result.rows[0];
    return article;
  } catch (error) {
    throw error;
  }
}

module.exports = { getArticleById, getArticlesModels };
