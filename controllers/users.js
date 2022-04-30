const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

const admCode = process.env.ADMCODE;
const mgrCode = process.env.MGRCODE;

module.exports.renderRegister = (req, res) => {
  res.render("auth/register");
};

module.exports.register = catchAsync(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    if (req.body.roleCode === admCode) {
      user.isAdmin = true;
    } else if (req.body.roleCode === mgrCode) {
      user.isMgr = true;
    }
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Account successfully created!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
});

module.exports.renderLogin = (req, res) => {
  res.render("auth/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcome Back!");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  req.flash("success", "Logged Out!");
  res.redirect("/campgrounds");
};
