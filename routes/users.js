const express = require("express");
const router = express.Router();
const passport = require("passport");
const { userInLogout } = require("../middleware");
const users = require("../controllers/users");

router.route("/register").get(users.renderRegister).post(users.register);

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

router.get("/logout", userInLogout, users.logout);

router.route("/forgot").get(users.renderForgot).post(users.sendEmail);

router.route("/reset/:token").get(users.renderReset).post(users.changePassword);

module.exports = router;
