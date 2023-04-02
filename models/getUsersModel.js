const db = require("../db/connection");

async function getUsers() {
  try {
    const result = await db.query(`SELECT * FROM users;`);
    const users = result.rows;
    

    if (!users) {
      return Promise.reject({
        status: 404,
        message: "User not found",
      });
    } else {
      return users;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = getUsers;
