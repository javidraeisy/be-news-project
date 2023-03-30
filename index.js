const express = require("express");
const bp = require("body-parser");

const app = express();


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


const topicsRouter = require("./routes/topics");
const articlesRouter = require("./routes/articles");




app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

module.exports = app;
