const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

// AUTHENTICATION
const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  const MESSAGE_401 = 'You must be logged in to access this API';

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if(err) {
      console.log('Error:', err)
      next({ status: 401, message: MESSAGE_401 });
      return;
    }

    req.decodedJwt = decodedToken;
    console.log('decoded token:', req.decodedJwt);
    next();
  })
}

// AUTHORIZATION
const checkRole = (req, res, next) => {
  next()
}

module.exports = {
  restricted,
  checkRole,
}
