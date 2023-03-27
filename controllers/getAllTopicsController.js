const getAllTopics = require("../models/getAllTopicsModel");

async function getAllTopicsController(req, res, next) {
  try {
    const topics = await getAllTopics();
    return res.status(200).send(topics.rows);
  } catch (error) {
    next(error);
  }
}

module.exports = getAllTopicsController;
