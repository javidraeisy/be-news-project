const db = require("../db/connection");

function getAllTopics() {
  return db.query("SELECT * FROM topics");
}

module.exports = getAllTopics;
