const {Router} = require("express");
const signUpController = require("../controllers/signUpController");
const signUpRouter = Router();

signUpRouter.get("/", signUpController.getSignUpForm);
signUpRouter.post("/create", signUpController.createUserPost);

module.exports = signUpRouter;