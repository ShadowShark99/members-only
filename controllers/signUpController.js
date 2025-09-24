//form validator
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
//const passport = require("passport");
const bcrypt = require("bcryptjs");

//express-validator setup

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

//passport set-up?
// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
//       const user = rows[0];

//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       }

//       const match = await bcrypt.compare(password, user.password);
//       if (!match) {
//         return done(null, false, { message: "Incorrect password" });
//       }
//       return done(null, user);
//     } catch(err) {
//       return done(err);
//     }
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//     const user = rows[0];

//     done(null, user);
//   } catch(err) {
//     done(err);
//   }
// });


exports.getSignUpForm = (req, res) => {
    res.render("sign-up-form", { title: "Sign Up"});
};

exports.createUserPost = [
  validateUser,
  async (req, res, next) => {
    const { username, email, password, clubPassword } = req.body;
    const errors = validationResult(req);
    console.log(clubPassword);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).render("sign-up-form", {
        title: "Sign Up",
        clubTag: clubPassword,
        errors: errors.array(),
      });
    }

    //Print current users
    await db.printUsers();

    //bcrypt?
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      if(clubPassword == "tess")
        await db.newClubUser(username, email, hashedPassword);
      else
        await db.newUser(username, email, hashedPassword);
      res.redirect("/");
    } catch(err) {
      return next(err);
    }
    //res.redirect("/");
  },
]

