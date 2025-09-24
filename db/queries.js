const pool = require("./pool");

async function printUsers(){
  const {rows} = await pool.query("SELECT * FROM club_users");
  console.log(rows);
}

async function newUser(username, email, password) {
  await pool.query("INSERT INTO club_users (email, username, password) VALUES ($1, $2, $3)", [email, username, password]);
}

async function newClubUser(username, email, password){
  await pool.query("INSERT INTO club_users (email, username, password, member) VALUES ($1, $2, $3, TRUE)", [email, username, password]);
};

module.exports={
  newClubUser,
  newUser,
  printUsers,
}