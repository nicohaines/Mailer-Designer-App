const con = require("./db_connect");
const bcrypt = require("bcrypt");

async function createUserTable() {
  let sql = `
        CREATE TABLE IF NOT EXISTS User (
        userId INT AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        CONSTRAINT userPK PRIMARY KEY (userId)
);`;

  await con.query(sql);
}

createUserTable();

async function getUserByEmail(email) {
  let sql = `
    SELECT * FROM User
    WHERE email=?
  `;
  let cUser = await con.query(sql, [email]);
  return cUser[0];
}

async function getAllUsers() {
  let sql = `
      SELECT * FROM User;
    `;
  return await con.query(sql);
}

async function login(user) {
  let cUser = await getUserByEmail(user.email);
  if (!cUser) throw Error("Email not found!");

  let match = await bcrypt.compare(user.password, cUser.password);
  if (!match) throw Error("Password Incorrect!");

  return cUser;
}

async function register(user) {
  let cUser = await getUserByEmail(user.email);
  if (cUser) throw Error("Email already in use!");

  let hashedPassword = await bcrypt.hash(user.password, 10);

  let sql = `
    INSERT INTO User(firstName, lastName, password, email)
    VALUES(?, ?, ?, ?)
  `;

  await con.query(sql, [
    user.firstName,
    user.lastName,
    hashedPassword,
    user.email,
  ]);
  return await login(user);
}

async function update(user) {
  let cUser = await getUserByEmail(user.email);
  if (!cUser) throw Error("Error finding user.");

  let match = await bcrypt.compare(user.password, cUser.password);
  if (!match) throw Error("Password does not match current password.");

  let same = await bcrypt.compare(user.newPassword, cUser.password);
  if (same) throw Error("New password cannot be the same as the current password.");

  let hashedPassword = await bcrypt.hash(user.newPassword, 10);

  let sql = `
    UPDATE User
    SET password=?
    WHERE userId=?
  `;

  await con.query(sql, [
    hashedPassword,
    cUser.userId,
  ]);

  return cUser;
}

async function remove(user) {
  let sql = `
    DELETE FROM User
    WHERE userId=?
  `;

  await con.query(sql, [user.userId]);
}

module.exports = { getAllUsers, login, register, update, remove };
