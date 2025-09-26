const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const pool = require("./db/pool");


//Passport function
module.exports = () => {
  passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM club_users WHERE username = $1", [username]);
      const user = rows[0];
      console.log(`username: ${username}`);
      console.log(`user: ${user.username}`);

      if (!user) {
        console.log("poop user");
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("poop password");
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

  //replace user.id with username
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  //replace id with username
  passport.deserializeUser(async (username, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM club_users WHERE username = $1", [username]);
      const user = rows[0];

      done(null, user);
    } catch(err) {
      done(err);
    }
  });
}
