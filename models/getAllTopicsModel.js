const db = require("../db/connection");

function getAllTopics() {
  return db.query("SELECT * FROM topics")
    .then(result => result.rows);
}

module.exports = getAllTopics;