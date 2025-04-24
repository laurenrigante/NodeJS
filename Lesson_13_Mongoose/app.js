require("dotenv").config();
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
//const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//this code will only run for incoming requests after the server is successfully initialized
/* app.use((req, res, next) => {
  User.findById("680a5a0e71d99116b0a53c61") //id from the db
    //this id is hardcoded for now, we will get it from the session later
    .then((user) => {
      req.user = new User(user.username, user.email, user.cart, user._id); //create a new user object and assign it to the request
      next(); //continue with next step if we get and store user
    })
    .catch((err) => {
      console.log(err);
    }); //find user in db
}); */

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
