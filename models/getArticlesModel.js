const db = require("../db/connection");

// async function getAllArticles() {
//   const result = await db.query(
//     `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC`
//   );
//   return result.rows;
// }
async function fetchArticles(topic, sort_by, order, limit, p) {
  const validSortByOptions = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "article_img_url",
  ];
  const validOrderOptions = ["asc", "desc"];
  const validNumericOptionsRegex = /\d+/;

  if (sort_by && !validSortByOptions.includes(sort_by)) {
    throw { status: 400, msg: "Invalid sort by option given" };
  }

  if (order && !validOrderOptions.includes(order)) {
    throw { status: 400, msg: "Invalid order option given" };
  }

  if (limit && !validNumericOptionsRegex.test(limit)) {
    throw { status: 400, msg: "Invalid limit option given" };
  }

  if (p && !validNumericOptionsRegex.test(p)) {
    throw { status: 400, msg: "Invalid page option given" };
  }

  let queryString = `
    SELECT 
      articles.author,
      articles.title,
      articles.article_id,
      articles.topic,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      COUNT(comments.article_id)::INTEGER AS comment_count,
      (COUNT(*) OVER())::INTEGER AS total_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id`;
  const queryParams = [];

  if (topic) {
    queryString += ` WHERE articles.topic = $1`;
    queryParams.push(topic);
  }

  queryString += ` GROUP BY articles.article_id`;

  if (sort_by) {
    queryString += ` ORDER BY articles.${sort_by}`;
  } else {
    queryString += ` ORDER BY articles.created_at`;
  }

  if (order) {
    queryString += ` ${order}`;
  } else {
    queryString += ` DESC`;
  }

  if (limit) {
    queryString += ` LIMIT ${limit}`;
    if (p > 1) {
      queryString += ` OFFSET ${limit * (p - 1)}`;
    }
  } else {
    queryString += ` LIMIT 10`;
    if (p > 1) {
      queryString += ` OFFSET ${10 * (p - 1)}`;
    }
  }

  try {
    const { rows } = await db.query(queryString, queryParams);
    return rows;
  } catch (err) {
    throw err;
  }
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

async function selectTopic(topic) {
  let queryString = `SELECT * FROM topics`;
  const queryParams = [];

  if (topic !== undefined) {
    queryString += ` WHERE topics.slug = $1`;
    queryParams.push(topic);
  }

  try {
    const { rows } = await db.query(queryString, queryParams);
    const rowCount = rows.length;
    if (rowCount === 0) {
      throw { status: 404, msg: "Topic not found" };
    } else {
      return rows[0];
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getArticleById,
  // getAllArticles,
  getCommentsByArticleId,
  selectTopic,
  fetchArticles,
};
