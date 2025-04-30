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
  User.findById("680a754488006ede60035993")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user; // Store the user in the session
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};