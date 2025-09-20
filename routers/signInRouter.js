const {Router} = require("express");
const signInController = require("../controllers/signInController");
const signInRouter = Router();

signInRouter.get("/", signInController.getSignInForm);

module.exports = signInRouter;