const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET

function encodeToken(payload) {
  return jwt.sign(payload, SECRET);
}
function decodeToken(token) {
  return jwt.verify(token, SECRET)
}

module.exports = { encodeToken, decodeToken }