const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const { mongoConnect } = require("./util/database");
const User = require("./models/user"); 

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//this code will only run for incoming requests after the server is successfully initialized
app.use((req, res, next) => {
   User.findById('680a5a0e71d99116b0a53c61') //id from the db
    //this id is hardcoded for now, we will get it from the session later
    .then((user) => {
      req.user = user;
      next(); //continue with next step if we get and store user
    })
    .catch((err) => {
      console.log(err);
    }); //find user in db 
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404); 

mongoConnect(() => {
  app.listen(3000);
});
