const express = require("express");
const feedRoutes = require("./routes/feed");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); //good for application/json headers

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.listen(3000);
