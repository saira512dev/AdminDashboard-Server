import passport from "passport";
import validator from "validator";
import User from "../models/User.js";

export const postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    errors = validationErrors.reduce((acc, err) => acc + `${err.msg}, `, "");
    res.send({ error: errors.slice(0, -2) });
    return;
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.send({ error: "Invalid user/password" });
      return;
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.json(req.user);
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  console.log(req.user)
  req.logout(() => {
    console.log("User has logged out.");
    res.send("logged out")
  });
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
  });
};


export const test = (req, res) => {
  res.json("CONNECTED")
  return;
};

