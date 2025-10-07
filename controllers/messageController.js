const db = require("../db/queries");

exports.getMessageForm = (req, res) => {
  res.render("create-message");
};

exports.postMessage = async (req, res) => {
  const {title, message} = req.body;
  console.log("testing local inforamtion");
  const user = res.locals.currentUser.username;
  console.log(user);
  await db.newMessage(title, message, user);
  res.redirect("/");
};

exports.deleteMessage = async(req, res) => {
    const{id} = req.body;
    await db.removeMessage(id);
    res.redirect("/");
}