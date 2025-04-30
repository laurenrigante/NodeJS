const User = require("../models/user"); // Import the User model
exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get("Cookie").split(";")[1].trim().split("="[1]); // Log the cookies sent by the client
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  //fetch user and store in session
  User.findById("5bab316ce0a7c75f783cb8a8")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user; // Store the user in the session
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
