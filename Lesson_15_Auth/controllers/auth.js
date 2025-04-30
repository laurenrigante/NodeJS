const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("680a754488006ede60035993")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  console.log("BODY:", req.body);
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  //validation implementation later

  //check if user already exists
  User.findOne({ email: email }).then((userDoc) => {
    if (userDoc) {
      console.log("User already exists.");
      return res.redirect("/signup");
    }

    //use bcrypt to hash the password
    return bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        //creaate a new user
        const user = new User({
          email: email,
          password: hashedPassword,
          cart: { items: [] },
        });
        console.log("Attempting to save user:", user);
        return user.save();
      })
      .then((result) => {
        console.log("User saved successfully:", result);
        res.redirect("/login");
      })
      .catch((err) => {
        console.log("Error saving user:", err);
      });
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
