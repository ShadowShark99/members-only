//form validator
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 255 characters.";

const validateUser = [
  body("username")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`username ${lengthErr}`),
  body("password")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`password ${lengthErr}`),
  body("email")
    .trim()
    .isLength({min: 1, max: 255})
    .withMessage(`email ${lengthErr}`),
];


exports.getSignUpForm = (req, res) => {
    res.render("sign-up-form", { title: "Sign Up"});
};

exports.createUserPost = [
  validateUser,
  (req, res) => {
    const { username, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).render("sign-up-form", {
        title: "Sign Up",
        errors: errors.array(),
      });
    }
    res.redirect("/");
  },
]

