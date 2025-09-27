const db = require("../db/queries");

exports.getClub = async (req,res) => {
  const messages = await db.getMessages();
  res.render("index", {user: req.user, messages});
};
