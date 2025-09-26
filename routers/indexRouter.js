const {Router} = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const passport = require("passport");

indexRouter.get("/", indexController.getClub);

//log out function by passport to terminate user
indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

module.exports = indexRouter;