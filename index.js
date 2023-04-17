const express = require("express");
const {
  
    handle400Errors,
    psqlErrors,
    handle500Errors,
    errorHandler,
  } = require("./errorsHandling/errorHandler");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const topicsRouter = require("./routes/topics");
const articlesRouter = require("./routes/articles");
const commentsRouter = require("./routes/comments");
const usersRouter = require("./routes/users");




app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

app.use("/api/users", usersRouter);

app.use("/api/comments", commentsRouter);

app.use(handle400Errors);
app.use(psqlErrors);
app.use(handle500Errors);
app.use(errorHandler);


module.exports = app;
