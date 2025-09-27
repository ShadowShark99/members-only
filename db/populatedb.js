require('dotenv').config();
const {Client} = require("pg");

//NEED TO ADD NULL TYEP
const SQL=`
  CREATE TABLE IF NOT EXISTS club_users(
    email VARCHAR (255),
    password VARCHAR (255), 
    username VARCHAR (255),
    member BOOLEAN DEFAULT FALSE,
    admin BOOLEAN NULL
  );

  CREATE TABLE IF NOT EXISTS club_messages(
    username VARCHAR (255),
    title VARCHAR (255), 
    message VARCHAR (255), 
    time DATE NOT NULL DEFAULT CURRENT_DATE
  );

  INSERT INTO club_users (email, username, password, member, admin)
  VALUES
    ('admin', 'admin', '67', TRUE, TRUE);

  INSERT INTO club_messages (username, title, message)
  VALUES
    ('admin', 'Welcome', 'Will you join?');
`;

async function main (){
  console.log("seeding...");
  const client = new Client({
    host: "localhost", // or wherever the db is hosted
    user: "kaden",
    database: "top_users",
    port: 5432 // The default port
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("finish");
}

main();