const express = require("express");
const feedRoutes = require("./routes/feed");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); //good for application/json headers

app.use("/feed", feedRoutes);

app.listen(3000);
