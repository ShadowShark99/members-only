exports.getClubDoor = (req, res) => {
  res.render("clubDoor");
}

exports.openClubDoor = (req,res) => {
  const {password} = req.body;
  if(password === "tess")
  {
    res.render("sign-up-form", {
      clubTag: "tess",
      title: "Secret Club Sign in",
    });
  }
  else
  {
    res.render("index");
  }
  
};