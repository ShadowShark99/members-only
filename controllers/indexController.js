const db = require("../db/queries");

exports.getClub = async (req,res) => {
  const messages = await db.getMessages();
  //console.log(req.user); //displays current use if logged in
  //console.log(messages);
  res.render("index", {user: req.user, messages});
};
