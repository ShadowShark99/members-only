const {Router} = require("express");
const indexController = require("../controllers/indexController");
const passportController = require("../controllers/passportController");
const indexRouter = Router();


indexRouter.get("/", indexController.getClub);



//log out function by passport to terminate user
indexRouter.get("/log-out", passportController.logout);
indexRouter.post("/log-in", passportController.login);
indexRouter.get("/try-again", indexController.tryAgain);

module.exports = indexRouter;