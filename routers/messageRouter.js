const {Router} = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.get("/", messageController.getMessageForm);
messageRouter.post("/create", messageController.postMessage);
messageRouter.post("/delete", messageController.deleteMessage);

module.exports = messageRouter;