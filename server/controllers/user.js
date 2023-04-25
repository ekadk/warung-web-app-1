const { comparePassword } = require('../helpers/hashPassword');
const { encodeToken, decodeToken } = require('../helpers/jwt');
const { User } = require('../models');
const { OAuth2Client } = require("google-auth-library");

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body
      const user = await User.create({ username, email, password, role: 'Admin', phoneNumber, address })
      res.status(201).json({ id: user.id, email: user.email })
    } catch (error) {
      next(error)
    }
  }
  
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      
      if(!email) {
        throw { name: 'email_required' }
      }

      if(!password) {
        throw { name: 'password_required' }
      }

      const user = await User.findOne({ where: { email } })
      if(!user) {
        throw { name: 'invalid_login' }
      }
      const compared = comparePassword(password, user.password)      
      if(!compared) {
        throw { name: 'invalid_login' }
      }

      const access_token = encodeToken({ id: user.id })

      res.status(200).json({ access_token })
      
    } catch (error) {
      next(error)
    }
  }
  
  static async googleSignIn(req, res, next) {
    try {
      const CLIENT_ID = process.env.CLIENT_ID;
      const client = new OAuth2Client(CLIENT_ID);
      const token = req.headers.google_token;
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      const googlePayload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: { email: googlePayload.email },
        defaults: {
          username: googlePayload.given_name,
          email: googlePayload.email,
          password: "GOOGLE",
          role: "Staff",
        },
        hooks: false,
      });

      const payload = { id: user.id };
      const access_token = encodeToken(payload);
      res.status(200).json({ access_token, username: user.username });
    } catch (error) {
      next(error);
    }
  }

  static async getUsername(req, res, next) {
    try {
      const payload = decodeToken(req.headers.access_token)
      const user = await User.findByPk(payload.id)
      res.status(200).json({ username: user.username })
    } catch (error) {
      next(error)
    }
  }

}