const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

// AUTHENTICATION
const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  const MESSAGE_401 = 'You must be logged in to access this API';

  if(token == null) {
    next({ status: 401, message: MESSAGE_401 });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if(err) {
      next({ status: 401, message: MESSAGE_401 });
    }
  })

  next()
}

// AUTHORIZATION
const checkRole = (req, res, next) => {
  next()
}

module.exports = {
  restricted,
  checkRole,
}
