const {Router} = require("express");
const doorController = require("../controllers/doorController");
const doorRouter = Router();

doorRouter.get("/", doorController.getClubDoor);
doorRouter.post("/open", doorController.openClubDoor);

module.exports = doorRouter;