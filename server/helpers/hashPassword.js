const bcrypt = require('bcryptjs');

function hashPassword(pw) {
  return bcrypt.hashSync(pw)
}
function comparePassword (pw, hashed) {
  return bcrypt.compareSync(pw, hashed)
}

module.exports = { hashPassword, comparePassword }