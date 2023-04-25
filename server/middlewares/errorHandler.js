function errorHandler(error, req, res, next) {
  console.log(error);
  let code = 500
  let message = "Internal Server Error"

  if (error.name === 'SequelizeUniqueConstraintError') {
    code = 400
    message = error.errors[0].message
  } else if (error.name === 'SequelizeValidationError') {
    code = 400
    message = error.errors[0].message
  } else if (error.name === 'email_required') {
    code = 400
    message = 'email required'
  } else if (error.name === 'password_required') {
    code = 400
    message = 'password required'
  } else if (error.name === 'invalid_login') {
    code = 401
    message = 'invalid email or password'
  } else if (error.name === "food_not_found") {
    code = 404
    message = `food with id ${error.foodId} not found`;
  } else if (error.name === "invalid_token" || error.name === 'JsonWebTokenError') {
    code = 401
    message = 'invalid token'
  } else if (error.name === 'not_authorized') {
    code = 403
    message = 'User not authorized'
  }

  res.status(code).json({ message })
}

module.exports = errorHandler