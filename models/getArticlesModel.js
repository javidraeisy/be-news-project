// const db = require("../db/connection");

// async function getArticleById(id) {
//   const result = await db.query(
//     `SELECT * FROM articles WHERE article_id = $1`,
//     [id]
//   );

//   const article = result.rows[0];
//   return article;
// }

// module.exports = { getArticleById };


const db = require("../db/connection");

async function getArticleById(id) {
  const result = await db.query(
    `SELECT * FROM articles WHERE article_id = $1`,
    [id]
  );

  const article = result.rows[0];
  return article || Promise.reject("No article found");
}

module.exports = { getArticleById };
