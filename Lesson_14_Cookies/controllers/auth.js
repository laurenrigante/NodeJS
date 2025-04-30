
exports.getLogin= (req, res, next) => {
  const isLoggedIn=(req.get('Cookie').split(';')[1].trim().split('='[1])); // Log the cookies sent by the client
      res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: isLoggedIn
        });
};

exports.postLogin= (req, res, next) => {
   req.session.isLoggedIn = true; // Set the session variable to indicate the user is logged in
  // Redirect to the home page
   res.redirect('/');
}