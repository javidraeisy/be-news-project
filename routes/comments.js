const express = require("express");
const router = express.Router();
const deleteComment = require("../controllers/deleteCommentsController");

router.delete("/:comment_id", deleteComment)

module.exports = router;
