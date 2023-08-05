const bcrypt = require("bcrypt");
const db = require("../config/connection");

async function findByUsername(username) {
  try{
    const [[user]] = await db.query(
    `SELECT * FROM users WHERE username=?`,
    username
    );
    return user;
  } catch (err) {
    console.error(err)
    throw new Error('Error unable to find username')
  }
}
async function checkPassword(plain, hash) {
  try{
    return bcrypt.compare(plain, hash);
  } catch (err) {
    console.error(err)
    throw new Error('Error with password')
  }
}
async function create(username, password) {
  try{
  const hashedPass = await bcrypt.hash(password, 10);

  await db.query(`INSERT INTO users (username, password) VALUES (?, ?)`, [
    username,
    hashedPass,
  ]);
  return findByUsername(username);
  } catch (err) {
    console.error(err)
    throw new Error('Error with username')
  }
}
// hashes the password before it's stored in mongo

module.exports = {
  create,
  checkPassword,
  findByUsername,
};
