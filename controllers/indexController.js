exports.getClub = (req,res) => {
  res.render("index", {user: req.user});
};
