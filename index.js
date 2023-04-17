const express = require("express");
const {
  
    handle400Errors,
    psqlErrors,
    handle500Errors,
    errorHandler,
  } = require("./errorsHandling/errorHandler");

const app = express();

app.use(express.json());

const topicsRouter = require("./routes/topics");
const articlesRouter = require("./routes/articles");
const commentsRouter = require("./routes/comments");




app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

app.use("/api/comments", commentsRouter);

app.use(handle400Errors);
app.use(psqlErrors);
app.use(handle500Errors);
app.use(errorHandler);


module.exports = app;
