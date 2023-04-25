const { decodeToken } = require("../helpers/jwt");
const { User } = require("../models");

module.exports = class Authentication {
  static async user(req, res, next) {
    try {
      const { access_token } = req.headers;

      if (!access_token) {
        throw { name: "invalid_token" };
      }

      const payload = decodeToken(access_token);
      const user = await User.findByPk(payload.id);

      if (!user) {
        throw { name: "invalid_token" };
      }

      req.user = { id: user.id, email: user.email, role: user.role };

      next();
    } catch (error) {
      next(error);
    }
  }
};
