const getUsers = require('../models/getUsersModel');

async function getUsersController(req, res, next) {
    try {
      const retrieveUsers = await getUsers();
      res.status(200).send({ users: retrieveUsers});
    } catch (error) {
      next(error);
    }
  }


module.exports = getUsersController;