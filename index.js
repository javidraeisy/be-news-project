const express = require("express");


const app = express();

app.use(express.json());

const topicsRouter = require("./routes/topics");
const articlesRouter = require("./routes/articles");




app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

module.exports = app;
