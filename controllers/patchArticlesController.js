const { errorHandler } = require("../errorsHandling/errorHandler");
const updateVoteCount = require("../models/patchArticles");

async function patchVotes(req, res, next) {
  try {
    const { article_id } = req.params;
    const { inc_votes } = req.body;

    const votes = await updateVoteCount(article_id, inc_votes);
    res.status(200).send({ msg: votes });
  } catch (err) {
    errorHandler(err, req, res, next);
  }
}

module.exports = patchVotes;
