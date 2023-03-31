const db = require('../db/connection')

exports.fetchSpecificArticle = (id) => {

    const articleId = id;
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [articleId]).then((result) => {
        if (!result.rows.length) {

            return Promise.reject({
                status: 404,
                msg: `No article found for article ${id}`
            })
        }
        return result.rows;
    })
}

exports.addArticleComment = (comment, articleNumber) => {
  const { body, username } = comment
  const values = [body, username, articleNumber]
  return db.query(`
  INSERT INTO comments (body, author, article_id) 
  VALUES ($1, $2, $3)
  RETURNING *;
  `, values).then((result) => {

      return result.rows[0]
  })
}